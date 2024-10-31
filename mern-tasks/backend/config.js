import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;


const connectToMongo = async()=>{
        try {

            if(!MONGO_URL){
                throw new Error('MongoDB URL is not defined');
            }
            await mongoose.connect(MONGO_URL, {
                dbName:DB_NAME,
                serverSelectionTimeoutMS:30000,
                socketTimeoutMS:50000,
            })
            console.log(`connected to database successfully ${DB_NAME}`);
            
            
        } catch (error) {
            console.error('Contact To Admin Server Stopped');
        }
};
export default connectToMongo;