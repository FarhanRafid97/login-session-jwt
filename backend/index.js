import express from 'express';
import db from './config/Database.js';
import Users from './models/UserModels.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 8010;

try {
  await db.authenticate();
  console.log('datbase jalan');
  //   await Users.sync();
} catch (error) {
  console.error(error);
}
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`server running at ${port}`));
