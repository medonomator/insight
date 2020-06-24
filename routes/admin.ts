import * as Hapi from "hapi";
import * as Joi from "joi";
// aphorisms controllers
import { createAphorism } from "../controllers/admin/aphorisms/createAphorism/";
import { getAphorisms } from "../controllers/admin/aphorisms/getAphorisms";
import { updateAphorism } from "../controllers/admin/aphorisms/updateAphorism";
import { deleteAphorism } from "../controllers/admin/aphorisms/deleteAphorism";
// materials controllers
import { createMaterials } from "../controllers/admin/materials/createMaterials";
import { getMaterials } from "../controllers/admin/materials/getMaterials";
import { updateMaterials } from "../controllers/admin/materials/updateMaterials";
import { deleteMaterials } from "../controllers/admin/materials/deleteMaterials";
// docs
import { docsAphorisms, docsMaterials } from "../config/docs";

const usersRoutes: Hapi.ServerRoute[] = [
  {
    method: "POST",
    path: "/v1/admin/aphorisms",
    handler: createAphorism,
    options: {
      ...docsAphorisms.createAphorism,
      auth: {
        strategy: "users",
      },
      validate: {
        payload: {
          author: Joi.string().trim().required().min(3),
          body: Joi.string().trim().required().min(10),
          tags: Joi.array(),
          category: Joi.string().trim().required().allow(""),
        },
      },
    },
  },
  {
    method: "GET",
    path: "/v1/admin/aphorisms",
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
    method: "PUT",
    path: "/v1/admin/aphorisms",
    handler: updateAphorism,
    options: {
      ...docsAphorisms.updateAphorism,
      auth: {
        strategy: "users",
      },
      validate: {
        payload: {
          _id: Joi.string().trim().required(),
          author: Joi.string().trim().required(),
          body: Joi.string().trim().required(),
          tags: Joi.array().required(),
          category: Joi.string().trim().required(),
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/v1/admin/aphorisms",
    handler: deleteAphorism,
    options: {
      ...docsAphorisms.deleteAphorism,
      auth: {
        strategy: "users",
      },
      validate: {
        payload: {
          _id: Joi.string().trim().required(),
        },
      },
    },
  },
  {
    method: "POST",
    path: "/v1/admin/materials",
    handler: createMaterials,
    options: {
      ...docsMaterials.createMaterials,
      // auth: {
      //   strategy: 'users',
      // },
      validate: {
        payload: {
          name: Joi.string().trim().required().min(3),
          description: Joi.string().trim().required().min(5),
          tags: Joi.array(),
          websiteUrl: Joi.string().allow(""),
          youtubeUrl: Joi.string().allow(""),
          books: Joi.string().allow(""),
          audioBooks: Joi.string().allow(""),
        },
      },
    },
  },
  {
    method: "GET",
    path: "/v1/admin/materials",
    handler: getMaterials,
    options: {
      ...docsMaterials.getMaterials,
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
    method: "PUT",
    path: "/v1/admin/materials",
    handler: updateMaterials,
    options: {
      ...docsMaterials.updateMaterials,
      auth: {
        strategy: "users",
      },
      validate: {
        payload: {
          _id: Joi.string().trim().required(),
          author: Joi.string().trim().required(),
          body: Joi.string().trim().required(),
          tags: Joi.array().required(),
          category: Joi.string().trim().required(),
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/v1/admin/materials",
    handler: deleteMaterials,
    options: {
      ...docsMaterials.deleteMaterials,
      auth: {
        strategy: "users",
      },
      validate: {
        payload: {
          _id: Joi.string().trim().required(),
        },
      },
    },
  },
];

export default usersRoutes;
