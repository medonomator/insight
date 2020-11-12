import Boom from "boom";
import { logger } from "../../../helpers/logger";
import { prepareTokens } from "../../../helpers/index";
import { encryptData } from "../../../helpers";
import { IParams, IResponse } from "./interfaces";
import { IUser } from "../userRegister/interfaces";
import { users } from "../../../database/schemas/users";

export const userLogin = async (req: IParams): Promise<IResponse | Boom> => {
  try {
    const { email, password } = req.payload;
    const user: IUser = await users.findOne({ email });

    if (!user || user.password !== encryptData(password, email.toLowerCase())) {
      return Boom.badRequest("Invalid login or password");
    }

    logger.info("Client successfully logged in", user);
    return prepareTokens(user);
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
