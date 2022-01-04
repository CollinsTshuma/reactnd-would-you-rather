import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

import logger from './logger';

const a = applyMiddleware(thunk, logger);

export default a;
