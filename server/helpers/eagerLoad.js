
export default class EagerLoad {
  includeChild(models, query) {
    const queryWithInclude = Array.isArray(query.include) ? query.include : [query.include];
    const include = [];

    models.forEach((model) => {
      const modelName = (model.model.name).toLowerCase();
      if (queryWithInclude.includes(modelName)) {
        include.push({ model: model.model, as: model.as, attributes: model.attributes });
      }
    });
    return include;
  }

  include(models, query) {
    const { include } = query;
    if (include) {
      return this.includeChild(models, query);
    }
    return [];
  }
}
