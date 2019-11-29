import './core/core';
import './layout/layout';
import route from './util/router';

route('.home', () => import('./home/home'));
