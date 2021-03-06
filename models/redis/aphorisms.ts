import { redisClient as redis } from "../../database/redis";
import { logger } from "../../helpers/logger";
import { CATEGORIES } from "../../constants/models";
import { uniqBy } from "lodash";
import { IRedisModel } from "../../interfaces/redis";
import { IAphorisms } from "../../interfaces/aphorism";
import { cyrToLat } from "../../helpers";

/**
 * Redis Aphorisms model
 */
class Aphorisms implements IRedisModel<IAphorisms[]> {
  private STORAGE_KEY = "aphorisms";
  private aphorisms: IAphorisms[] = [];
  private tags = new Set();
  private authors = new Set();

  /**
   * Set aphorisms list
   */
  public async setAll(aphorisms: IAphorisms[]): Promise<"ok" | Error> {
    try {
      for await (const aphorism of aphorisms) {
        await this.set(aphorism);
        await this.setAuthorAphorism(aphorism);
      }

      return "ok";
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * Set aphorism
   */
  public async set(aphorism: IAphorisms) {
    let firstKey = "";

    if (aphorism.category === CATEGORIES.kastaneda) {
      firstKey = `${this.STORAGE_KEY}:${aphorism.category}:${aphorism.id}`;
    } else {
      firstKey = `${this.STORAGE_KEY}:${aphorism.category}:${aphorism.authorMachineName}`;
    }

    if (aphorism.category !== CATEGORIES.kastaneda) {
      for await (const tag of aphorism.tags) {
        const secondKey = `${this.STORAGE_KEY}:${aphorism.category}:${tag.machineName}:${aphorism.authorMachineName}:${aphorism.id}`;
        await redis.set(secondKey, JSON.stringify(aphorism));

        this.tags.add(tag.name);
      }
    }

    await redis.set(firstKey, JSON.stringify(aphorism));
    this.authors.add(aphorism.authorName);
  }

  /**
   * Set author aphorism
   */
  public async setAuthorAphorism(aphorism: IAphorisms) {
    const key = `${this.STORAGE_KEY}:${aphorism.authorMachineName}:${aphorism.id}`;

    aphorism.authorName = aphorism.authorName.replace(/ /g, "");
    await redis.set(key, JSON.stringify(aphorism));
  }

  /**
   * Get aphorisms by category
   */
  public async getByCategory(category: string): Promise<any> {
    const keys = await redis.keys(`${this.STORAGE_KEY}:${category}:*`);
    await this.filler(keys);
    return this.aphorisms;
  }

  /**
   * Get aphorism by tag
   */
  public async getByTag(tag: string): Promise<IAphorisms[]> {
    tag = cyrToLat(tag);
    const keys = await redis.keys(`${this.STORAGE_KEY}:${CATEGORIES.mysliteliFilosophy}:${tag}:*`);
    await this.filler(keys);
    return this.aphorisms;
  }

  /**
   * Get aphorism by author
   */
  public async getByAuthor(author: string): Promise<IAphorisms[]> {
    author = cyrToLat(author);
    const key = `${this.STORAGE_KEY}:${author}:*`;
    const keys = await redis.keys(key);

    await this.filler(keys);
    return this.aphorisms;
  }

  /**
   * Get all aphorisms
   */
  public async getAll(): Promise<IAphorisms[]> {
    const keys = await redis.keys(`${this.STORAGE_KEY}:*`);
    await this.filler(keys);
    return this.aphorisms;
  }

  /**
   * Get all tags
   */
  public async getTags(): Promise<Set<unknown>> {
    return this.tags;
  }

  /**
   * Get all authors
   */
  public async getAuthors(): Promise<Set<unknown>> {
    return this.authors;
  }

  /**
   * Inner helper
   */
  private async filler(keys: string[]): Promise<void> {
    this.aphorisms = [];

    for await (const key of keys) {
      this.aphorisms.push(JSON.parse(await redis.get(key)));
    }
    this.aphorisms = uniqBy(this.aphorisms, "_id");
  }
}

export default new Aphorisms();
