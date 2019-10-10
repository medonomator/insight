import * as Vision from 'vision';
import * as Hapi from 'hapi';
import { logger } from '../../helpers/logger';
import { getAphorisms } from '../../controllers/admin/aphorisms';
import * as fs from 'fs';

export const getMainPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getMainPage request');
  const res = await getAphorisms({ query: { limit: 8 } });
  return h.view('index', {
    res,
    notes: [],
    techniques: [],
  });
};

export const getAphorismsPage = async (res, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getAphorismsPage request');
  try {
    const res = await getAphorisms({ query: { category: 'Мыслители, философы' } });

    return h.view('aphorisms', { res });
  } catch (error) {
    logger.error('error', error);
  }
};

export const getNotesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getNotesPage request');
  return h.view('notes', { notes: [] });
};

export const getTechniquesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getTechniquesPage request');
  return h.view('techniques', { techniques: [] });
};

export const getContactsPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getContactsPage request');
  return h.view('contacts');
};

export const getGratitudePage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getGratitudePage request');
  return h.view('gratitude');
};

export const getAdminBundle = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('adminbundle request');
  return h.file('./static/vue/index.html');
};
