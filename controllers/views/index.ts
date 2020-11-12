import * as Vision from "vision";
import * as Hapi from "hapi";
import Boom from "boom";
import { logger } from "../../helpers/logger";
import aphorismsModel from "../../models/redis/aphorisms";
import { IAphorisms } from "../../interfaces/aphorism";
import materialsTable from "../../tables/materials";
import aphorismsTable from "../../tables/aphorisms";
import { knex } from "../../database/pgConnect";
import { shuffle } from "lodash";

export const getMainPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    logger.info("getMainPage");
    return h.view("index");
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};

export const getAphorismsPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    const NUMBER_FIRST_RENDER = 100;
    const aphorisms: IAphorisms[] = shuffle(await aphorismsModel.getAll());
    const tags = await aphorismsModel.getTags();
    const authors = await aphorismsModel.getAuthors();

    aphorisms.length = NUMBER_FIRST_RENDER;

    logger.info("getAphorismsPage");

    return h.view("aphorisms", {
      aphorisms,
      tags,
      authors,
    });
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};

export const getAffirmationPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info("getAffirmationPage");
  return h.view("affirmation");
};

export const getMaterialsPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  const materials = await knex(materialsTable.table);
  logger.info("getMaterialsPage");
  return h.view("materials", { materials });
};

export const getContactsPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info("getContactsPage");
  return h.view("contacts");
};

export const getGratitudePage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info("getGratitudePage");
  return h.view("gratitude");
};

export const developmentPlanPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info("devlopmentPlanPage");
  return h.view("developmentPlan");
};

export const dynamicAphorismsPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    const aphorism = (await knex(aphorismsTable.table).where("id", req.params.id))[0];

    if (!aphorism) {
      return h.view("404");
    }

    logger.info("dynamicAphorismsPage");

    return h.view("dynamicAphorism", { aphorism });
  } catch (error) {
    logger.error("dynamicAphorismsPage");
    return h.view("404");
  }
};

export const dynamicMaterialPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    const material = (await knex(materialsTable.table).where("id", req.params.id))[0];

    if (!material) {
      return h.view("404");
    }

    logger.info("dynamicMaterialPage");

    return h.view("dynamicMaterial", { material });
  } catch (error) {
    logger.error("dynamicMaterialPage");
    return h.view("404");
  }
};

export const getAdminBundle = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info("adminbundle");
  return h.file("./static/vue/index.html");
};
