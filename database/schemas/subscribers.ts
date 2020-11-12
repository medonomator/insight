import * as Mongoose from "mongoose";
import { ISubscriber } from "../../controllers/admin/subscribers/getSubscribers/interfaces";

const subscribersSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    versionKey: false,
  }
);

export const subscribers = <ISubscriber | any>Mongoose.model("subscribers", subscribersSchema);
