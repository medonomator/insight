import * as Hapi from 'hapi';
import * as Joi from 'joi';

import { getMainPage } from '../../handlers/views';

const views: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: getMainPage
  }
]

export default views;