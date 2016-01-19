import 'babel-polyfill';
import 'source-map-support/register';
import create from './create';
import createRouter from './routes/createRouter';
import listen from './listen';

// Public server API
export default { create, createRouter, listen };
