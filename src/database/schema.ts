import { desc } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const PackagesTable = sqliteTable('packages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  version: text('version').notNull(),
  description: text('description'),
  outdated: integer('outdated', {mode: 'boolean'}).default(false).notNull(),
  latestVersion: text('latest_version'),
  alternativePackages: text('alternative_packages'),
  size: integer('size').notNull(),
  createdAt: text('created_at').default(new Date().toISOString()).notNull(),
  updateAt: text('updated_at').default(new Date().toISOString()).notNull(),
});

export type Packages = typeof PackagesTable;
