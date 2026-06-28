import dns from 'dns';
import mongoose from 'mongoose';
import 'dotenv/config';
import { Hospital } from './models/hospitalSchema.js'; 

dns.setServers(['8.8.8.8', '8.8.4.4']);

const mockHospitals = [
    {
        hospitalName: "Apollo Heart Institute",
        specialty: "Cardiology",
        symptoms: ["chest pain", "heart attack", "shortness of breath"],
        location: { type: "Point", coordinates: [77.2800, 28.5355] }, // [Long, Lat]
        rating: 4.8,
        reviewCount: 3450
    },
    {
        hospitalName: "Max Super Speciality Hospital",
        specialty: "Orthopedics",
        symptoms: ["knee pain", "bone fracture", "back pain"],
        location: { type: "Point", coordinates: [77.2200, 28.5500] },
        rating: 4.6,
        reviewCount: 2100
    },
    {
        hospitalName: "Fortis Escorts",
        specialty: "Cardiology",
        symptoms: ["heart pain", "arrhythmia", "dizziness"],
        location: { type: "Point", coordinates: [77.2700, 28.5400] },
        rating: 4.7,
        reviewCount: 2890
    },
    {
        hospitalName: "AIIMS General Trauma Center",
        specialty: "Emergency & Trauma",
        symptoms: ["accident", "severe bleeding", "head injury"],
        location: { type: "Point", coordinates: [77.2090, 28.5670] },
        rating: 4.9,
        reviewCount: 8500
    },
    {
        hospitalName: "Medanta The Medicity",
        specialty: "Neurology",
        symptoms: ["stroke", "seizures", "migraine"],
        location: { type: "Point", coordinates: [77.0380, 28.4595] }, // Gurgaon
        rating: 4.8,
        reviewCount: 4200
    },
    {
        hospitalName: "Cloudnine Hospital",
        specialty: "Gynecology",
        symptoms: ["pregnancy", "irregular periods", "pcos"],
        location: { type: "Point", coordinates: [77.3300, 28.5800] }, // Noida
        rating: 4.8,
        reviewCount: 4200
    },
    {
        hospitalName: "Clove Dental",
        specialty: "Dentistry",
        symptoms: ["toothache", "bleeding gums", "cavity"],
        location: { type: "Point", coordinates: [77.3000, 28.4000] }, // Faridabad
        rating: 4.4,
        reviewCount: 1550
    },
    {
        hospitalName: "Apollo Heart Institute",
        specialty: "Cardiology",
        symptoms: ["chest pain", "heart attack", "shortness of breath", "palpitations"],
        location: { type: "Point", coordinates: [77.2800, 28.5355] },
        rating: 4.8,
        reviewCount: 3450
    },
    {
        hospitalName: "AIIMS Trauma Center",
        specialty: "Emergency & Trauma",
        symptoms: ["accident", "severe bleeding", "unconscious", "head injury", "burns"],
        location: { type: "Point", coordinates: [77.2090, 28.5670] },
        rating: 4.9,
        reviewCount: 8500
    },
    
    // --- Gurgaon ---
    {
        hospitalName: "Medanta The Medicity",
        specialty: "Neurology",
        symptoms: ["stroke", "seizures", "migraine", "paralysis", "numbness"],
        location: { type: "Point", coordinates: [77.0380, 28.4595] },
        rating: 4.8,
        reviewCount: 4200
    },
    {
        hospitalName: "Artemis Hospital",
        specialty: "General Medicine",
        symptoms: ["fever", "dengue", "malaria", "typhoid", "flu"],
        location: { type: "Point", coordinates: [77.0500, 28.4300] },
        rating: 4.5,
        reviewCount: 1500
    },

    // --- Noida ---
    {
        hospitalName: "Cloudnine Hospital",
        specialty: "Gynecology",
        symptoms: ["pregnancy", "irregular periods", "pcos", "pelvic pain"],
        location: { type: "Point", coordinates: [77.3300, 28.5800] },
        rating: 4.8,
        reviewCount: 4200
    },

    // --- Dwarka ---
    {
        hospitalName: "Aakash Healthcare",
        specialty: "ENT",
        symptoms: ["ear pain", "hearing loss", "sinus", "sore throat", "tonsils"],
        location: { type: "Point", coordinates: [77.0700, 28.5800] },
        rating: 4.6,
        reviewCount: 1750
    },
    {
        hospitalName: "Centre for Sight",
        specialty: "Ophthalmology",
        symptoms: ["blurry vision", "eye pain", "red eyes", "cataract", "vision loss"],
        location: { type: "Point", coordinates: [77.0600, 28.5900] },
        rating: 4.7,
        reviewCount: 2450
    },

    // --- Faridabad ---
    {
        hospitalName: "Asian Institute of Medical Sciences",
        specialty: "Urology",
        symptoms: ["kidney stones", "urination pain", "blood in urine", "dialysis"],
        location: { type: "Point", coordinates: [77.3000, 28.4000] },
        rating: 4.5,
        reviewCount: 2800
    },
    {
        hospitalName: "Clove Dental",
        specialty: "Dentistry",
        symptoms: ["toothache", "bleeding gums", "cavity", "root canal", "wisdom tooth pain"],
        location: { type: "Point", coordinates: [77.3100, 28.4100] },
        rating: 4.4,
        reviewCount: 1550
    }
];

const seedDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected successfully!");

        // Critical: Purana data saaf karo taaki Geospatial index conflict na ho
        await Hospital.deleteMany({});
        console.log("Old data cleared.");

        // Insert new data
        await Hospital.insertMany(mockHospitals);
        console.log("✅ Database seeded successfully with GeoJSON!");
        
        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};

seedDatabase();