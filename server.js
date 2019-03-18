import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import PlanCron from './server/helpers/planCroneJob';

import userRoute from './server/router/user';
import planRoute from './server/router/plan';
import walletRoute from './server/router/wallet';

require('dotenv').config();

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

PlanCron();
app.use('/api/v1', userRoute);
app.use('/api/v1', planRoute);
app.use('/api/v1', walletRoute);
app.use(express.static(path.join(__dirname, '/dist/BitBuild')));
app.use('*', (req, res) => res.sendFile(path.join(__dirname, './dist/BitBuild/index.html')));

app.listen(process.env.PORT || '5000', () => {
  console.log('server is running');
});
