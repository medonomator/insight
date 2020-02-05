import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { createAphorism } from '../controllers/admin/aphorisms/createAphorism/';
import { getAphorisms } from '../controllers/admin/aphorisms/getAphorisms';
import { updateAphorism } from '../controllers/admin/aphorisms/updateAphorism';
import { deleteAphorism } from '../controllers/admin/aphorisms/deleteAphorism';
import { docsAphorisms, docsMainData } from '../config/docs';
import { getMainData } from '../controllers/admin/mainData/getMainData';
import { changeMainData } from '../controllers/admin/mainData/changeMainData';

const usersRoutes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/admin/aphorisms',
    handler: createAphorism,
    options: {
      ...docsAphorisms.createAphorism,
      auth: {
        strategy: 'users',
      },
      validate: {
        payload: {
          author: Joi.string()
            .trim()
            .required()
            .min(3),
          body: Joi.string()
            .trim()
            .required()
            .min(10),
          tags: Joi.array(),
          category: Joi.string()
            .trim()
            .required()
            .allow(''),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/admin/aphorisms',
    handler: getAphorisms,
    options: {
      ...docsAphorisms.getAphorisms,
      validate: {
        query: {
          offset: Joi.number(),
          category: Joi.string().trim(),
          limit: Joi.number(),
          author: Joi.string(),
          body: Joi.string(),
          topic: Joi.string(),
          isAdmin: Joi.boolean(),
          random: Joi.boolean(),
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/admin/aphorisms',
    handler: updateAphorism,
    options: {
      ...docsAphorisms.updateAphorism,
      auth: {
        strategy: 'users',
      },
      validate: {
        payload: {
          _id: Joi.string()
            .trim()
            .required(),
          author: Joi.string()
            .trim()
            .required(),
          body: Joi.string()
            .trim()
            .required(),
          tags: Joi.array().required(),
          category: Joi.string()
            .trim()
            .required(),
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/admin/aphorisms',
    handler: deleteAphorism,
    options: {
      ...docsAphorisms.deleteAphorism,
      auth: {
        strategy: 'users',
      },
      validate: {
        payload: {
          _id: Joi.string()
            .trim()
            .required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/admin/mainData',
    handler: getMainData,
    options: {
      ...docsMainData.getMainData,
      auth: {
        strategy: 'users',
      },
    },
  },
  {
    method: 'PUT',
    path: '/admin/mainData',
    handler: changeMainData,
    options: {
      ...docsMainData.changeMainData,
      auth: {
        strategy: 'users',
      },
      validate: {
        payload: {
          mainPage: Joi.object({
            headerH1: Joi.string().allow(''),
            headerText: Joi.string().allow(''),
          }).optional(),
          aphorismPage: Joi.object({
            headerH1: Joi.string().allow(''),
            headerText: Joi.string().allow(''),
          }).optional(),
          affirmationPage: Joi.object({
            headerH1: Joi.string().allow(''),
            headerText: Joi.string().allow(''),
          }).optional(),
          materialPage: Joi.object({
            headerH1: Joi.string().allow(''),
            headerText: Joi.string().allow(''),
          }).optional(),
          developmentPlanPage: Joi.object({
            headerH1: Joi.string().allow(''),
            headerText: Joi.string().allow(''),
          }).optional(),
        },
      },
    },
  },
];

export default usersRoutes;
