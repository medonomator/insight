import { Pool } from 'pg';
import { logger } from '../helpers/logger';
import { filler } from './fillerPg';

export const pg = new Pool({
  connectionString: process.env.PG_URI,
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
      aphorismAuthors(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        machine_name VARCHAR(128) NOT NULL
      )`;
const tableAphorismCategories = `CREATE TABLE IF NOT EXISTS
      aphorismCategories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        machine_name VARCHAR(128) NOT NULL
      )`;
const tableAphorisms = `CREATE TABLE IF NOT EXISTS
      aphorisms(
        id SERIAL PRIMARY KEY,
        author VARCHAR(128) NOT NULL,
        body character(1000) NOT NULL
      )`;
// pg.query(tableAphorismCategories).catch(err => logger.error(err));
// pg.query(tableAphorismAuthors).catch(err => logger.error(err));
// filler();
