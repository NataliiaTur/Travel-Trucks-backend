import express from 'express';
import cors from 'cors';
import { loggerPino } from './middlewares/loggerPino';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(loggerPino);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
