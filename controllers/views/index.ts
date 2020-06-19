import * as Vision from "vision";
import * as Hapi from "hapi";
import Boom from "boom";
import { logger } from "../../helpers/logger";
import { authors as authorsCollection } from "../../database/schemas/authors";
import { topics as topicCollection } from "../../database/schemas/topics";
import { aphorisms } from "../../database/schemas/aphorisms";
import { materials } from "../../database/schemas/materials";
import { mainData } from "../../database/schemas/mainData";
import { takeAphorisms } from "../../helpers/aphorisms";
import { IResTakeAphorisms } from "../admin/aphorisms/interfaces";
import { IItemNameMachine } from "../../interfaces";
import aphorismsModel from "../../models/redis/aphorisms";

export const getMainPage = async (req, h: Vision<Hapi.ResponseToolkit>) => {
  try {
    logger.info("getMainPage");
    return h.view("index");
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};

export const getAphorismsPage = async (
  req,
  h: Vision<Hapi.ResponseToolkit>
) => {
  try {
    logger.info("getAphorismsPage");
    return h.view("aphorisms", {
      aphorisms: await aphorismsModel.getAll(),
    });
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};

export const getAffirmationPage = async (
  req,
  h: Vision<Hapi.ResponseToolkit>
) => {
  logger.info("getAffirmationPage");
  return h.view("affirmation");
};

export const getMaterialsPage = async (
  req,
  h: Vision<Hapi.ResponseToolkit>
) => {
  logger.info("getMaterialsPage");
  return h.view("materials");
};

export const getContactsPage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info("getContactsPage");
  return h.view("contacts");
};

export const getGratitudePage = (req, h: Vision<Hapi.ResponseToolkit>) => {
  logger.info("getGratitudePage");
  return h.view("gratitude");
};

export const developmentPlanPage = async (
  req,
  h: Vision<Hapi.ResponseToolkit>
) => {
  logger.info("devlopmentPlanPage");
  return h.view("developmentPlan");
};

export const dynamicAphorismsPage = async (
  req,
  h: Vision<Hapi.ResponseToolkit>
) => {
  try {
    logger.info("dynamicAphorismsPage");
    const aphorism = await aphorisms.findById(req.params.id).lean();

    if (!aphorism) {
      return h.view("404");
    }

    return h.view("dynamicAphorism", { aphorism });
  } catch (error) {
    logger.error("dynamicAphorismsPage");
    return h.view("404");
  }
};

export const dynamicMaterialPage = async (
  req,
  h: Vision<Hapi.ResponseToolkit>
) => {
  try {
    logger.info("dynamicMaterialPage");
    const material = await materials.findById(req.params.id).lean();

    if (!material) {
      return h.view("404");
    }

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
