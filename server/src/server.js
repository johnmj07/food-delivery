import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import { dbconnect } from './config/database.config.js';
import {fileURLToPath} from 'url';
import path, { dirname } from 'path';

dotenv.config()

dbconnect()

const __filename= fileURLToPath(import.meta.url)
const __dirname= dirname(__filename)

const app= express();

app.use(express.json());

app.use(cors({
  credentials: 'true',
  origin: ['http://localhost:3000']
}))

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);

const publiceFolder=path.join(__dirname, 'public')
app.use(express.static(publiceFolder))

app.get('*', (req,res)=>{
  const indexFilePath=path.join(publiceFolder, 'index.html')
  res.sendFile(indexFilePath)
})

const PORT=7000;


app.listen(PORT, ()=>{
  console.log(`server running on ${PORT}`);
  
})