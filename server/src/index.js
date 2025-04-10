import express from 'express';
import routes from './routes.js';
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://solar-system-react-2025-retake-client.onrender.com'],
}));

app.use(express.json());
app.use(authMiddleware);
app.use(routes);

const PORT = process.env.PORT || 3000;
const url = process.env.MONGO_URI || "mongodb://localhost:27017";

mongoose.connect(url, { dbName: 'solar-system'})
  .then(() => console.log('DB Connected!'))
  .catch((err) => console.log(`DB failed: #{err}`));

app.listen(3000, () => console.log('Server is listening on http://localhost:3000 ...'))