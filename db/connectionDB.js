import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()

export const connectionDB = async()=>{
    try {
    await mongoose.connect(process.env.MONGO_CLOUDE_URL)
        console.log('Database is successfully Connennected!.')
    } catch (error) {
        console.log('No connection created yet!.',error)

    }
}

