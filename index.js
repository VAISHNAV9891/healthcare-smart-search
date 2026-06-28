import dns from 'dns';
dns.setServers(['8.8.8.8','8.8.4.4']);
import express from 'express';
import mongoose from 'mongoose';
import { GoogleGenAI } from '@google/genai';
import { searchRouter } from './routes/index.js';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());//Don't block any ip for now
app.use(express.json());
app.use(ExpressMongoSanitize());
app.use('/api/healthcare', searchRouter);
//Testing function
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


// async function testAI() {
//     try {
//         const response = await ai.models.generateContent({
//             model: 'gemini-2.5-flash',
//             contents: 'Say hello to my new healthcare MVP backend!'
//         });
//         console.log("AI says:", response.text);
//     } catch (error) {
//         console.error("AI connection failed:", error);
//     }
// }

// testAI();

const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully....');
        app.listen(PORT, () => {
            console.log('Booting server....');
            console.log(`Server started successfully on PORT : ${PORT}`);
        });
    }catch(error){
       console.error('There is some problem booting the server', error); 
    }
};

startServer();
