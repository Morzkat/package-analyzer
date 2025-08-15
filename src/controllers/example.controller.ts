import { Request, Response } from 'express';

/**
 * @openapi
 * /api/example:
 *   get:
 *     summary: Example endpoint
 *     description: Returns a simple example response.
 *     responses:
 *       200:
 *         description: Example response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from the example endpoint!
 */
export const exampleEndpoint = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from the example endpoint!' });
};