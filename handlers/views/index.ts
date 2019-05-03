import * as Vision from 'vision';
import * as Hapi from 'hapi';
import * as db from '../../database/schemas';

export const getMainPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  h.state('data', { firstVisit: false });
  return h.view('index');
};

export const getAphorismsPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  h.state('data', { firstVisit: false });
  return h.view('aphorisms');
};

export const getNotesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  h.state('data', { firstVisit: false });
  return h.view('notes');
};

export const getTechniquesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  h.state('data', { firstVisit: false });
  return h.view('techniques');
};
