import cors from 'cors';
import connectToMongo from './config.js';
import dotenv from 'dotenv';
import bookRoute from './routes/bookRoute.js'
import express from 'express';              
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // use for json req
app.use(express.urlencoded({extended:true}));
connectToMongo();


const PORT = process.env.PORT;

app.use('/api/v1/books/', bookRoute);

app.listen(PORT, ()=>{
    console.log(`Your server running on port ${PORT}`);
});