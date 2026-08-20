import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://instagram:qJtVYmBb8wZx8h2n@cluster0.7uqxnrv.mongodb.net/instagram?appName=Cluster0`)
            .then(() => console.log(mongoose.connection.name))
    } catch (error) {
        console.log(error)
    }
}

export default DB