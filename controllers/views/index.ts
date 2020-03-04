import * as Vision from 'vision';
import * as Hapi from 'hapi';
import Boom from 'boom';
import { logger } from '../../helpers/logger';
import { authors as authorsCollection } from '../../database/schemas/authors';
import { topics as topicCollection } from '../../database/schemas/topics';
import { materials } from '../../database/schemas/materials';
import { mainData } from '../../database/schemas/mainData';
import { takeAphorisms } from '../../helpers/aphorisms';
import { IResTakeAphorisms } from '../admin/aphorisms/interfaces';
import { IItemNameMachine } from '../../interfaces';
import { ID_MAINDATA_DOCUMENT } from '../../constants';

interface ImainData {
  mainPage?: {
    headerH1: string;
    headerText: string;
  };
  aphorismPage?: {
    headerH1: string;
    headerText: string;
  };
  affirmationPage?: {
    headerH1: string;
    headerText: string;
  };
  materialPage?: {
    headerH1: string;
    headerText: string;
  };
  developmentPlanPage?: {
    headerH1: string;
    headerText: string;
  };
}

export const getMainPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    logger.info('getMainPage');
    const { mainPage } = (await mainData.findById(ID_MAINDATA_DOCUMENT)) as ImainData;
    const resTakeAphorisms = (await takeAphorisms({ limit: 4 })) as IResTakeAphorisms;

    return h.view('index', { aphorisms: resTakeAphorisms.aphorisms, mainPage });
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
    const { aphorismPage } = (await mainData.findById(ID_MAINDATA_DOCUMENT)) as ImainData;

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
      aphorismPage,
      aphorisms: resTakeAphorisms.aphorisms,
    });
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};

export const getAffirmationPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  const { affirmationPage } = (await mainData.findById(ID_MAINDATA_DOCUMENT)) as ImainData;
  logger.info('getAffirmationPage');
  return h.view('affirmation', { affirmationPage });
};

export const getMaterialsPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  const { materialPage } = (await mainData.findById(ID_MAINDATA_DOCUMENT)) as ImainData;
  const allMaterials = await materials.find().lean();

  logger.info('getMaterialsPage');
  return h.view('materials', { materialPage, materials: allMaterials });
};

export const getContactsPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getContactsPage');
  return h.view('contacts');
};

export const getGratitudePage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getGratitudePage');
  return h.view('gratitude');
};
export const devlopmentPlanPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  const { developmentPlanPage } = (await mainData.findById(ID_MAINDATA_DOCUMENT)) as ImainData;
  logger.info('devlopmentPlanPage');
  return h.view('developmentPlan', { developmentPlanPage });
};

export const getAdminBundle = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('adminbundle');
  return h.file('./static/vue/index.html');
};
