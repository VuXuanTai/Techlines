import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;
const connectToDatabase = async () => {
    try {
        console.log('uri:' );
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`Connected to database ${connect.connection.host}`);
    } catch (error) {
        console.error(`error ${error.message}`);
    }
}

export default connectToDatabase;