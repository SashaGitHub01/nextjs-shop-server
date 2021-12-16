import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import fileUploader from 'express-fileupload';
import { sequelize } from "./db.js";
import morgan from "morgan";
import router from "./routers/index.js";
import path from "path";
import cookieSession from "cookie-session";
import cors from 'cors';

export const __dirname = path.resolve();

const app = express();

const PORT = 3001;

app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(cookieSession({
   name: 'session',
   keys: ['keylol'],
   maxAge: 99999999999999
}));
app.use(fileUploader({}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/api', router);

const start = async () => {
   try {
      await sequelize.authenticate();
      await sequelize.sync();

      app.listen(PORT, async () => console.log('SERVER', PORT))
   } catch (err) {
      console.log(err)
   }
}

start();