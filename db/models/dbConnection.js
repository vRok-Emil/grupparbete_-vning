import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB(){
    if(!process.env.MONGODB_URI){
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"grupparbete-vning"
        });
        console.log("Connected to MongoDB");
    }
}