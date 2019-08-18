import * as Vision from 'vision';
import * as Hapi from 'hapi';
import { aphorisms } from '../../database/schemas/aphorisms';
import { settings } from '../../database/schemas/settings';
import * as aphorismsJson from '../../config/data/aphorisms';
import { BASE_URL } from '../../config';
import { logger } from '../../helpers/logger';
import { isEmpty } from 'lodash';
import { getAphorisms } from '../../controllers/admin/aphorisms';

export const getMainPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getMainPage request');
  // TODO: здесь нужно отдавать 8 случайных афоризмов
  // Так что наверно все-таки так и так выгодно вызывать этот контроллер с афоризмами
  return h.view('index', {
    aphorisms: aphorismsJson.slice(0, 8),
    notes: [],
    techniques: [],
  });
};

export const getAphorismsPage = async ({ params }, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info('getAphorismsPage request');
  try {
    const size = 100;
    const cond = {};

    if (!isEmpty(params.category) && params.category !== 'all') {
      cond['tags.machineName'] = params.category;
    }

    let resAphorisms: any = await getAphorisms();
    console.log('=============================');
    console.log('logging', resAphorisms.data);
    console.log('=============================');
    // let resAphorisms = await aphorisms
    //   .find(cond)
    //   .select('-_id -__v')
    //   .limit(size)
    //   .lean();

    // TODO: make populate
    let { allCategories } = await settings
      .findOne({ allCategories: { $exists: true } })
      .lean()
      .select('allCategories -_id');

    resAphorisms.data['categories'] =
      allCategories && allCategories.map(({ machineName, name }) => ({ machineName, name }));

    if (params.category) {
      return resAphorisms.data;
    }

    return h.view('aphorisms', { aphorisms: resAphorisms.data, path: `${BASE_URL}/static/` });
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
