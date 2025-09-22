import { db } from './database';
import { Package, PackageInfo } from '../models/package.model';
import { PackagesTable } from './schema';
import { and, eq, desc } from 'drizzle-orm';

const get = async (name: string, version?: string) => {
  return await db
    .select()
    .from(PackagesTable)
    .where(
      and(eq(PackagesTable.name, name), version ? eq(PackagesTable.version, version) : undefined),
    )
    .orderBy(desc(PackagesTable.createdAt))
    .limit(1)
    .get();
};

const add = async (pkg: PackageInfo) => {
  await db
    .insert(PackagesTable)
    .values({
      name: pkg.name,
      version: pkg.version,
      size: 0,
      description: pkg.description,
      createdAt: pkg.createdAt,
      updateAt: pkg.updateAt,
      outdated: pkg.outdated,
      latestVersion: pkg.latestVersion,
      alternativePackages: pkg.alternativePackages ? pkg.alternativePackages.join(',') : undefined,
    })
    .run();
};

const remove = (name: string, version: string) => {
  // Logic to remove a package by name and version
};

const update = async (
  name: string,
  version: string,
  size: number,
  created: string,
  modified: string,
) => {
  await db
    .update(PackagesTable)
    .set({
      name: name,
      version: version,
      size: size,
      createdAt: created,
      updateAt: modified,
    })
    .where(and(eq(PackagesTable.name, name), eq(PackagesTable.version, version)))
    .run();
};

export default {
  get,
  add,
  update,
  // remove,
};
