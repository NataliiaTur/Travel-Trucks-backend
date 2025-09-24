import express from 'express';
import cors from 'cors';
import { loggerPino } from './middlewares/loggerPino.js';
import campersRouter from './routers/campers.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(loggerPino);

  app.use('/api', campersRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
