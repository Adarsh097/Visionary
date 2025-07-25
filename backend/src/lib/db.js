import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch (error) {
        console.log("Error in connecting to MongDB",error);
        process.exit(1); //* 1 status for failure
    }
}
