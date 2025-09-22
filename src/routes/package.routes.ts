import express, { Router } from 'express';
import {
  getPackageInfo,
  getPackageSize,
  analyzePackageFile,
  healthCheck,
} from '../controllers/package.controller';
import multer from 'multer';

const router: Router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Packages
 *     description: API endpoints for package information and analysis
 */

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Packages]
 *     description: Returns the status and current timestamp to verify the API is running.
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-14T12:34:56.789Z"
 */
router.get('/health', healthCheck);

/**
 * @openapi
 * /api/packages/info/{name}:
 *   get:
 *     summary: Get package information by name
 *     tags: [Packages]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Name of the npm package
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Package information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       404:
 *         description: Package not found
 */
router.get('/info/:name', getPackageInfo);

/**
 * @openapi
 * /api/packages/size/{name}/{version}:
 *   get:
 *     summary: Get package size information by name and version
 *     tags: [Packages]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Name of the npm package
 *         schema:
 *           type: string
 *       - name: version
 *         in: path
 *         required: true
 *         description: Version of the npm package
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Package size information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Package or version not found
 */
router.get('/size/:name/:version', getPackageSize);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/**
 * @openapi
 * /api/packages/analyze:
 *   post:
 *     summary: Analyze uploaded package file
 *     tags: [Packages]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The package file to analyze
 *     responses:
 *       200:
 *         description: File analysis result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File analysis endpoint is under construction.
 *       400:
 *         description: No file provided
 */
router.post('/analyze', upload.single('file'), analyzePackageFile);

export default router;
