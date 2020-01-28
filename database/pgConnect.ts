import { Pool } from 'pg';
import { logger } from '../helpers/logger';

export const pg = Pool({
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
const tableAphorismAuthors = `CREATE TABLE IF NOT EXISTS
      aphorism_authors(
        id integer PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        machine_name VARCHAR(128) DEFAULT 'default'
      )`;
const tableAphorismCategories = `CREATE TABLE IF NOT EXISTS
      aphorism_categories(
        id integer PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        machine_name VARCHAR(128) DEFAULT 'default'
      )`;
const tableAphorismTopics = `CREATE TABLE IF NOT EXISTS
      aphorism_topics(
        id integer PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        machine_name VARCHAR(128) DEFAULT 'default',
        aphorism_id integer NOT NULL,
        FOREIGN KEY (aphorism_id) REFERENCES aphorisms (id)
      )`;
const tableAphorisms = `CREATE TABLE IF NOT EXISTS
      aphorisms(
        id integer PRIMARY KEY,
        author_id integer NOT NULL,
        category_id integer NOT NULL,
        FOREIGN KEY (author_id) REFERENCES aphorism_authors(id),
        FOREIGN KEY (category_id) REFERENCES aphorism_categories(id),
        body character(1000) NOT NULL
      )`;

pg.query(tableAphorismAuthors).catch(err => logger.error(err));
pg.query(tableAphorismCategories).catch(err => logger.error(err));
pg.query(tableAphorisms).catch(err => logger.error(err));
pg.query(tableAphorismTopics).catch(err => logger.error(err));
