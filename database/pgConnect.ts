import { Pool } from 'pg';
import { logger } from '../helpers/logger';

export const pg = new Pool({
  connectionString: 'postgres://postgres:example@localhost:5432/postgres',
  // connectionString: process.env.PG_URI,
});
pg.connect((err: Error) => {
  if (err) {
    logger.error('connection error', err.stack);
  } else {
    logger.info('Postgres connected');
  }
});
/**
 * Create Tables
 */
const aphorismAuthors = `CREATE TABLE IF NOT EXISTS
      aphorism_authors(
        id integer PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        machine_name VARCHAR(128) DEFAULT 'default'
      )`;
const aphorismCategories = `CREATE TABLE IF NOT EXISTS
      aphorism_categories(
        id integer PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        machine_name VARCHAR(128) DEFAULT 'default'
      )`;
const aphorismTopics = `CREATE TABLE IF NOT EXISTS
      aphorism_topics(
        id integer PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        machine_name VARCHAR(128) DEFAULT 'default',
        aphorism_id integer NOT NULL,
        FOREIGN KEY (aphorism_id) REFERENCES aphorisms (id)
      )`;
const aphorisms = `CREATE TABLE IF NOT EXISTS
      aphorisms(
        id integer PRIMARY KEY,
        author_id integer NOT NULL,
        category_id integer NOT NULL,
        FOREIGN KEY (author_id) REFERENCES aphorism_authors(id),
        FOREIGN KEY (category_id) REFERENCES aphorism_categories(id),
        body character(1000) NOT NULL
      )`;

pg.query(aphorismAuthors).catch(err => logger.error(err));
pg.query(aphorismCategories).catch(err => logger.error(err));
pg.query(aphorismTopics).catch(err => logger.error(err));
pg.query(aphorisms).catch(err => logger.error(err));
