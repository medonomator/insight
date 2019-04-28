import * as Vision from 'vision';
import * as Hapi from 'hapi';
import * as db from '../../database/schemas';

export const getMainPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  h.state('data', { firstVisit: false });
  return h.view('index');
};
