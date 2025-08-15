import packagesService from './../services/packages.service';
import { Request, Response, NextFunction } from 'express';

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

const upload = multer({ dest: 'uploads/' }); // Temporary upload folder

export const analyzePackageFile = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // // Placeholder for actual file analysis logic
    // const analysisResult = {
    //   filename: req.file.originalname,
    //   size: req.file.size,
    //   mimetype: req.file.mimetype,
    //   // Add more analysis details here
    // };
    res.status(200).json({ message: 'File analysis endpoint is under construction.' });
  } catch (error: unknown) {
    next(error);
  }
};
function multer(arg0: { dest: string }) {
  // throw new Error('Function not implemented.');
}
