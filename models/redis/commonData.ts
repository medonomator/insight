import { redisClient as redis } from "../../database/redis";
import { logger } from "../../helpers/logger";
import axios from "axios";

/**
 * Redis Aphorisms model
 */
class CommonData {
  private STORAGE_KEY = "commonData";
  private CLIENT_ID = 7747790;
  /**
   * Set vk token
   */
  public async getVkToken(): Promise<"ok" | Error> {
    try {
      // await redis.set('vk-token', );

      if (!(await redis.get("vk-token"))) {
        const res = await axios.get(
          `https://oauth.vk.com/authorize?client_id=7747790&display=page&scope=wall,offline&redirect_uri=https://oauth.vk.com/blank.html&response_type=token&v=5.50`
        );
        console.log('======================================================');
        console.dir('OPA');
        console.log('======================================================');
        // console.log('======================================================');
        // console.log(res.data);
        // console.log('======================================================');
      }

      return "ok";
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}

export default new CommonData();
