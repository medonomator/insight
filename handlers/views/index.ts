import * as Vision from 'vision';
import * as Hapi from 'hapi';
import { aphorisms } from '../../database/schemas/aphorisms';
import { settings } from '../../database/schemas/settings';
import * as aphorismsJson from '../../config/data/aphorisms';
import { BASE_URL } from '../../config';
import { logger } from '../../helpers/logger';

export const getMainPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  return h.view('index', {
    aphorisms: aphorismsJson.slice(0, 8),
    notes: [],
    techniques: [],
  });
};

export const getAphorismsPage = async ({ params }, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    const page = params.page || 1;
    const perPage = 100;

    const cond = {};

    cond['tags.machineName'] = params.category;

    let resAphorisms = await aphorisms
      .find(cond)
      .select('-_id -__v')
      .skip(perPage * page - perPage)
      .limit(perPage)
      .lean();

    let { allCategories } = await settings
      .findOne({ allCategories: { $exists: true } })
      .lean()
      .select('allCategories -_id');

    resAphorisms['categories'] = allCategories && allCategories.map(({ machineName, name }) => ({ machineName, name }));

    return h.view('aphorisms', { aphorisms: resAphorisms, path: `${BASE_URL}/static/` });
  } catch (error) {
    logger.error('error', error);
  }
};

export const getNotesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  return h.view('notes', { notes: [] });
};

export const getTechniquesPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  return h.view('techniques', { techniques: [] });
};
