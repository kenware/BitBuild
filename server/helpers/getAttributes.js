import Sequelize from 'sequelize';

const { Op } = Sequelize;
const included = ['include'];
const modeTypes = {
  DECIMAL: { type: 'number', op: Number },
  INTEGER: { type: 'number', op: Number },
  'VARCHAR(255)': { type: 'string', op: String },
  TEXT: { type: 'string', op: String },
  'TIMESTAMP WITH TIME ZONE': { type: 'string', op: String },
};

export default class Filter {
  validateType(key, type, query, rangeKey) {
    let queryValue = query[key] || query[`${rangeKey}${key}`];
    queryValue = type.op(queryValue);
    if (queryValue && typeof queryValue === type.type) {
      return queryValue;
    }
    return { error: 'error', message: `Invalid value '${query[key]}' for field '${key}'` };
  }

  getModelType(key, type, query, rangeKey) {
    if (type) {
      const value = this.validateType(key, type, query, rangeKey);
      return value;
    }
    return { error: 'error', message: `You cannot filter with ${key} field` };
  }

  getQueryValue(model, key, query, rangeKey) {
    const modelType = model.rawAttributes[key].type.toSql();
    const type = modeTypes[modelType];
    const value = this.getModelType(key, type, query, rangeKey);
    return value;
  }

  updateWhere(where, value, newKey, type) {
    if (newKey && type) {
      const op = type === 'start' ? { [Op.gte]: value } : { [Op.lte]: value };
      const range = where[newKey] || {};
      const newWhere = Object.assign(range, op);
      // eslint-disable-next-line no-param-reassign
      where[newKey] = newWhere;
      return where;
    }
    return where;
  }

  getRangeValue(model, colNames, key, query) {
    let value = {};
    let newKey;
    let type;

    if (key.startsWith('start') && colNames.includes(key.slice(5))) {
      newKey = key.slice(5);
      type = 'start';
      value = this.getQueryValue(model, newKey, query, type);
    } else if (key.startsWith('end') && colNames.includes(key.slice(3))) {
      newKey = key.slice(3);
      type = 'end';
      value = this.getQueryValue(model, newKey, query, type);
    }
    return { value, type, newKey };
  }

  pushQueryKey(data) {
    const {
      colNames,
      validQueryKey,
      range,
      key,
      error,
    } = data;

    if (colNames.includes(key)) {
      validQueryKey.push(key);
    } else if (!included.includes(key) && !key.startsWith('start') && !key.startsWith('end')) {
      const newError = `${key} is not a valid field name`;
      error.push(newError);
    } else {
      range.push(key);
    }
    return { error, validQueryKey, range };
  }

  generateQueryKey(colNames, queryKeys) {
    let validQueryKey = [];
    let range = [];
    let error = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const key of queryKeys) {
      ({ error, validQueryKey, range } = this.pushQueryKey({
        colNames, validQueryKey, range, key, error,
      }));
    }
    return { error, validQueryKey, range };
  }

  get(model, query) {
    const colNames = Object.keys(model.rawAttributes);
    const queryKeys = Object.keys(query);
    let where = {};

    const { error, validQueryKey, range } = this.generateQueryKey(colNames, queryKeys);
    if (error.length) return { error: 'error', message: error };

    // eslint-disable-next-line no-restricted-syntax
    for (const key of validQueryKey) {
      const value = this.getQueryValue(model, key, query, 'startEnd');
      if (value.error) {
        return value;
      }
      where[key] = value;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key of range) {
      const { value, type, newKey } = this.getRangeValue(model, colNames, key, query);
      if (value.error) {
        return value;
      }
      where = this.updateWhere(where, value, newKey, type);
    }
    return where;
  }
}
