import Mongoose from "mongoose";
import { logger } from "../helpers/logger";
import dotenv from "dotenv";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_DATABASE }: any = dotenv.config().parsed;

const createMongoUri = () => {
  let url = "localhost";
  if (process.env.NODE_ENV !== "development") {
    url = "83.166.242.213";
  }

  return `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${url}/${MONGO_INITDB_DATABASE}`;
};

const mongoConnection = async () => {
  try {
    await Mongoose.connect(createMongoUri(), { useNewUrlParser: true });
    logger.info("Mongo connected");
  } catch (error) {
    logger.error(error);
  }
};

export default mongoConnection;
