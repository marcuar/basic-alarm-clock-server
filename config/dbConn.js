import mongoose from "mongoose";

const connectDB = () => {
    try{
        mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err.message)
    }
}

export default connectDB;