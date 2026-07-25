import mongoose from "mongoose"

export const connectDB = async () => {

    try{
         await mongoose.connect(process.env.MONGO_URI);
         console.log("MONGODB CONNECTED SUCCESSFULLY")
    }

    catch(err){
        console.error(err);
        process.exit(1);
    }
}

// mongodb+srv://unrealengine456_db_user:Raqaa3Vu3lSiMf1Q@cluster0.kuwrdhq.mongodb.net/?appName=Cluster0
 