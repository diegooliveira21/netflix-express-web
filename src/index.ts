import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { apiRouter } from './routes/api.routes';
import { extRouter } from './routes/external.routes';
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(apiRouter);
app.use(extRouter);

export const ENV_VARS = {
    mongoURI: process.env.MONGO_URI,
    token_secret: process.env.TOKEN_SECRET,
}

mongoose.connect(ENV_VARS.mongoURI as string);

export const handler = serverless(app,  { callbackWaitsForEmptyEventLoop: false });
