import * as Mongoose from "mongoose";
import { IAphorisms } from "../../interfaces/aphorism";

const aphorismsSchema = new Mongoose.Schema(
  {
    authorName: {
      type: String,
    },
    authorMachineName: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    tags: [
      {
        name: String,
        machineName: String,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    versionKey: false,
  }
);

export const aphorisms = <IAphorisms | any>Mongoose.model("aphorisms", aphorismsSchema);
