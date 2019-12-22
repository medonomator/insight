import * as Vision from 'vision';
import * as Hapi from 'hapi';
import Boom from 'boom';
import { logger } from '../../helpers/logger';
import { authors as authorsCollection } from '../../database/schemas/authors';
import { topics as topicCollection } from '../../database/schemas/topics';
import { takeAphorisms } from '../../helpers/aphorisms';
import { IResTakeAphorisms } from '../admin/aphorisms/interfaces';
import { IItemNameMachine } from '../../interfaces';

export const getMainPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    logger.info('getMainPage');
    const resTakeAphorisms = (await takeAphorisms({ limit: 4 })) as IResTakeAphorisms;

    return h.view('index', { aphorisms: resTakeAphorisms.aphorisms });
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};

export const getAphorismsPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    const resTakeAphorisms = (await takeAphorisms({})) as IResTakeAphorisms;
    const allAuthors: IItemNameMachine[] = await authorsCollection.find().lean();
    const allTopics: IItemNameMachine[] = await topicCollection.find().lean();

    const categories =
      allTopics &&
      allTopics
        .map(({ machineName, name }) => ({ machineName, name }))
        .sort((item): any => item.machineName === 'all')
        .reverse();

    const authors =
      allAuthors &&
      allAuthors
        .map(({ machineName, name }) => ({ machineName, name }))
        .sort((item): any => item.machineName === 'all')
        .reverse();

    logger.info('getAphorismsPage');
    return h.view('aphorisms', {
      authors,
      categories,
      aphorisms: resTakeAphorisms.aphorisms,
    });
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};

export const getNotesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getNotesPage');
  return h.view('notes', { notes: [] });
};

export const getTechniquesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getTechniquesPage');
  return h.view('techniques', { techniques: [] });
};

export const getContactsPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getContactsPage');
  return h.view('contacts');
};

export const getGratitudePage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getGratitudePage');
  return h.view('gratitude');
};
export const devlopmentPlanPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('devlopmentPlanPage');
  return h.view('developmentPlan');
};

export const getAdminBundle = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('adminbundle');
  return h.file('./static/vue/index.html');
};
