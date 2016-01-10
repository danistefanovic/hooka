import 'babel-polyfill';
import 'source-map-support/register';
import create from './create';
import createRouter from './routes/createRouter';

// Public server API
export default { create, createRouter };
