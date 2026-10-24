import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { uploadDir } from './middleware/upload';

export const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));
app.use(routes);
app.use(errorHandler);
