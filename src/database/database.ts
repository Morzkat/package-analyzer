import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const database = new Database('src/database/data/packages.db');
export const db = drizzle(database);
