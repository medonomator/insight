import * as Vision from 'vision';
import * as Hapi from 'hapi';
import { logger } from '../../helpers/logger';
import { settings } from '../../database/schemas/settings';
import { takeAphorisms } from '../../helpers/aphorisms';

export const getMainPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    logger.info('getMainPage request');
    const params = {
      limit: 8,
    };
    const aphorisms = await takeAphorisms(params);
    return h.view('index', {
      aphorisms,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getAphorismsPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getAphorismsPage request');
  try {
    const aphorisms = await takeAphorisms({});

    const { allCategories, allAuthors } = (await settings
      .findOne({ allCategories: { $exists: true } }, { allAuthors: { $exists: true } })
      .lean()
      .select('allCategories allAuthors -_id')) as any;

    const categories =
      allCategories &&
      allCategories
        .map(({ machineName, name }) => ({ machineName, name }))
        .sort(item => item.machineName === 'all')
        .reverse();

    const authors =
      allAuthors &&
      allAuthors
        .map(({ machineName, name }) => ({ machineName, name }))
        .sort(item => item.machineName === 'all')
        .reverse();

    return h.view('aphorisms', {
      authors,
      categories,
      aphorisms,
    });
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
  return h.file('./static/build/index.html');
};
