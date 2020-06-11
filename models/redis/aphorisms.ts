import { aphorisms } from "./../../database/schemas/aphorisms";
import { redisClient as redis } from "../../database/redis";
import { logger } from "../../helpers/logger";
import { CATEGORIES } from "../../constants/models";
import { uniqBy, isEmpty } from "lodash";
/**
 * Redis Aphorisms model
 */
// TODO: need realize Implements and interfaces...
class Aphorisms {
  private STORAGE_KEY = "aphorisms";
  private aphorisms = [];
  /**
   * Save aphorisms list
   * @param {IAphorism[]} params
   * @return {Promise<'ok | Error'>}
   */
  public async setAll(aphorisms): Promise<"ok" | Error> {
    try {
      for await (const aphorism of aphorisms) {
        await this.set(aphorism);

        const key = `${this.STORAGE_KEY}:${aphorism.author}`;
        for await (const tag of aphorism.tags) {
          await redis.zadd(key, aphorism.id, JSON.stringify(tag));
        }
      }
      return "ok";
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
  /**
   * Save aphorism
   * @param {IAphorism} params
   * @return {Promise<'ok'>}
   */
  public async set(aphorism) {
    let firstKey = "";

    if (aphorism.category === CATEGORIES.kastaneda) {
      firstKey = `${this.STORAGE_KEY}:${aphorism.category}:${aphorism.id}`;
    } else {
      firstKey = `${this.STORAGE_KEY}:${aphorism.category}:${aphorism.authorMachineName}`;
    }

    if (aphorism.category !== CATEGORIES.kastaneda) {
      {
        for await (const tag of aphorism.tags) {
          if (isEmpty(tag.machineName)) {
          }
          const secondKey = `${this.STORAGE_KEY}:${aphorism.category}:${tag.machineName}:${aphorism.authorMachineName}:${aphorism.id}`;
          await redis.set(secondKey, JSON.stringify(aphorism));
        }
      }
    }

    // need add method "if exist"
    await redis.set(firstKey, JSON.stringify(aphorism));
  }
  /**
   * Save aphorism
   * @param {IAphorism} params
   * @return {Promise<'ok'>}
   */
  public async getByCategory(category: string): Promise<any> {
    const keys = await redis.keys(`${this.STORAGE_KEY}:${category}:*`);
    await this.filler(keys);
    return this.aphorisms;
  }
  /**
   * Save aphorism
   * @param {IAphorism} params
   * @return {Promise<'ok'>}
   */
  public async getByTag(tag: string): Promise<any> {
    const keys = await redis.keys(
      `${this.STORAGE_KEY}:${CATEGORIES.mysliteliFilosophy}:${tag}:*`
    );
    await this.filler(keys);
    return this.aphorisms;
  }
  /**
   * Save aphorism
   * @param {IAphorism} params
   * @return {Promise<'ok'>}
   */
  public async getByAuthor(author: string): Promise<any> {
    const firstKey = `${this.STORAGE_KEY}:${author}`;
    const secondKey = `${this.STORAGE_KEY}:${CATEGORIES.mysliteliFilosophy}:${author}:*`;

    const res = await redis.zrange(firstKey, 0, 10);
    const keys = await redis.keys(secondKey);

    await this.filler(keys);
    return this.aphorisms;
  }
  /**
   * Save aphorism
   * @param {IAphorism} params
   * @return {Promise<'ok'>}
   */
  public async getAll(): Promise<any> {
    const keys = await redis.keys(`${this.STORAGE_KEY}:*`);
    await this.filler(keys);
    return this.aphorisms;
  }
  /**
   * Inner helper
   * @param {IAphorism} params
   * @return {Promise<'ok'>}
   */
  private async filler(keys: string[]): Promise<any> {
    for await (const key of keys) {
      // this.aphorisms.push(JSON.parse(await redis.get(key)));
    }
    this.aphorisms = uniqBy(this.aphorisms, "id");
  }
  /**
   * Inner helper
   * @param {IAphorism} params
   * @return {Promise<'ok'>}
   */
  private async keyBuilder(keys: string[]): Promise<any> {
    // ...
  }
}

export default new Aphorisms();
