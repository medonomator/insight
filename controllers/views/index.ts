import * as Vision from 'vision';
import * as Hapi from 'hapi';
import { logger } from '../../helpers/logger';
import { getAphorisms } from '../../controllers/admin/aphorisms';

export const getMainPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getMainPage request');
  const res = await getAphorisms({ query: { size: 8 } });
  return h.view('index', {
    res,
    notes: [],
    techniques: [],
  });
};

export const getAphorismsPage = async (res, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getAphorismsPage request');
  try {
    const res = await getAphorisms({ query: {} });

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

export const getAdminBundle = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('adminbundle request');
  return h.file('./static/vue/index.html');
};
