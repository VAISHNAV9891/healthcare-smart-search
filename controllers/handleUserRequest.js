import { GoogleGenAI } from '@google/genai';
import { Hospital } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//Function -> 1 : To get a better understanding of the user intent 
const classifyUserIntent = async (userMessage) => {
    try {
        const prompt = `
            You are a medical triage classifier. Analyze the following user message.
            Your ONLY job is to determine if this message indicates a severe, life-threatening medical emergency (e.g., heart attack, severe trauma, stroke, heavy bleeding, suicidal ideation).
            
            User Message: "${userMessage}"
            
            Return ONLY a raw JSON object (no markdown, no backticks) with this exact structure:
            {
                "isEmergency": boolean,
                "reason": "Brief string explaining why"
            }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: prompt
        });

        // Clean the response to ensure strict JSON parsing
        const jsonText = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Classification AI Error:", error);
        return { isEmergency: true, reason: "Fallback due to AI parsing error" }; 
    }
};


export const handlePatientRequest = async (req, res) => {
    try {
        const { symptom, location } = req.body;

        // Validation
        if (!symptom || !location) {
            return res.status(400).json({ error: "Please provide both 'symptom' and 'location' in the request body." });
        }

        
        const intentAnalysis = await classifyUserIntent(symptom);

        if (intentAnalysis.isEmergency) {
            return res.status(200).json({
                status: "EMERGENCY",
                analysis: intentAnalysis.reason,
                botResponse: "Based on your symptoms, this appears to be a critical medical emergency. Please stop chatting and call 102 or go to the nearest emergency room immediately."
            });
        }

       
        const retrievedHospitals = await Hospital.find(
            { 
                location: new RegExp(location, 'i'), // Case-insensitive match for location
                $text: { $search: symptom }          // Native MongoDB text search
            },
            { score: { $meta: "textScore" } } 
        )
        .sort({ score: { $meta: "textScore" }, rating: -1 }) 
        .limit(3);


        if (retrievedHospitals.length === 0) {
            return res.status(200).json({
                status: "success",
                botResponse: `I couldn't find any specialized hospitals for "${symptom}" in ${location} within our current database. Please consult a general physician nearby.`
            });
        }

        
        const systemPrompt = `
            You are an empathetic, professional healthcare routing assistant.
            A user in ${location} is reporting the following symptom: "${symptom}".
            
            I have queried our database and found the following verified hospitals:
            ${JSON.stringify(retrievedHospitals)}

            Your task:
            1. Suggest the most highly-rated hospital from this data.
            2. Be polite and concise.
            3. DO NOT invent or mention any hospitals that are not in the JSON data provided above.
            4. Include a brief disclaimer that this is an AI recommendation, not a medical diagnosis.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: systemPrompt
        });

        return res.status(200).json({
            status: "success",
            userQuery: { symptom, location },
            retrievedData: retrievedHospitals, // Expose raw data so evaluators can verify the AI didn't hallucinate
            botResponse: response.text
        });

    } catch (error) {
        console.error("Triage Controller Flow Error:", error);
        res.status(500).json({ error: "An internal server error occurred while processing your request." });
    }
};