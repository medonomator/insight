import * as Vision from 'vision';
import * as Hapi from 'hapi';
import * as db from '../../database/schemas';
import * as aphorisms from '../../config/data/aphorisms';

// temporary MOCKS
const notes = []
const techniques = []

export const getMainPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  return h.view('index', {
    aphorisms: aphorisms.slice(0, 8),
    notes: notes.slice(0, 8),
    techniques: techniques.slice(0, 8)
  });
};

export const getAphorismsPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  return h.view('aphorisms', { aphorisms });
};

export const getNotesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  return h.view('notes', { notes });
};

export const getTechniquesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  return h.view('techniques', { techniques });
};
