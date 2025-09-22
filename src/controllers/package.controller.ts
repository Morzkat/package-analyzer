import packagesService from './../services/packages.service';
import { Request, Response, NextFunction } from 'express';
import { JsonPackage } from '../models/jsonPackage.model';

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
};

export const getPackageInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  try {
    const packageInfo = await packagesService.getInformation(name);
    res.status(200).json(packageInfo);
  } catch (error: unknown) {
    next(error);
  }
};

export const getPackageSize = async (req: Request, res: Response, next: NextFunction) => {
  const { name, version } = req.params;
  try {
    const packageSize = await packagesService.getSize(name, version);
    res.status(200).json(packageSize);
  } catch (error: unknown) {
    next(error);
  }
};

export const analyzePackageFile = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const content = req.file.buffer.toString('utf-8');
    const data: JsonPackage = JSON.parse(content);

    const dependencies = await packagesService.analyzeDependencies(data.dependencies || {});
    const devDependencies = await packagesService.analyzeDependencies(data.devDependencies || {});

    const response = {
      dependencies,
      devDependencies,
    };

    res.status(200).json(response);
  } catch (error: unknown) {
    next(error);
  }
};
