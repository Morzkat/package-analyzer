import express, { Express } from 'express';
import packageRoutes from './routes/package.routes';
import { setupSwagger } from './swagger';

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

app.use('/api/packages', packageRoutes);


setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

console.log(
  'This is a placeholder for the app.ts file. The actual implementation is not provided in the recent edits.',
);
