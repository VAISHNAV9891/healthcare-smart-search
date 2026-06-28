import mongoose from 'mongoose';
import 'dotenv/config';
import { Hospital } from './models/hospitalSchema.js'; // Adjust this path if your model is located elsewhere



// 1. Define the Mock Data
const mockHospitals = [
    {
        hospitalName: "Apollo Apollo Heart Institute",
        specialty: "Cardiology",
        symptoms: ["chest pain", "heart attack", "shortness of breath", "palpitations", "high blood pressure"],
        location: "South Delhi",
        rating: 4.8,
        reviewCount: 3450
    },
    {
        hospitalName: "Max Super Speciality Hospital",
        specialty: "Orthopedics",
        symptoms: ["knee pain", "bone fracture", "back pain", "arthritis", "joint stiffness"],
        location: "South Delhi",
        rating: 4.6,
        reviewCount: 2100
    },
    {
        hospitalName: "Fortis Escorts",
        specialty: "Cardiology",
        symptoms: ["heart pain", "arrhythmia", "dizziness", "chest tightness"],
        location: "Okhla",
        rating: 4.7,
        reviewCount: 2890
    },
    {
        hospitalName: "AIIMS General Trauma Center",
        specialty: "Emergency & Trauma",
        symptoms: ["accident", "severe bleeding", "unconscious", "head injury", "burns"],
        location: "South Delhi",
        rating: 4.9,
        reviewCount: 8500
    },
    {
        hospitalName: "Medanta The Medicity",
        specialty: "Neurology",
        symptoms: ["stroke", "seizures", "migraine", "paralysis", "numbness"],
        location: "Gurgaon",
        rating: 4.8,
        reviewCount: 4200
    },
    {
        hospitalName: "Artemis Hospital",
        specialty: "General Medicine",
        symptoms: ["fever", "dengue", "malaria", "typhoid", "severe cold", "flu"],
        location: "Gurgaon",
        rating: 4.5,
        reviewCount: 1500
    },
    {
        hospitalName: "Batra Hospital",
        specialty: "Gastroenterology",
        symptoms: ["stomach pain", "vomiting", "food poisoning", "acid reflux", "diarrhea"],
        location: "Tughlakabad",
        rating: 4.3,
        reviewCount: 980
    },
    {
        hospitalName: "Sir Ganga Ram Hospital",
        specialty: "Pulmonology",
        symptoms: ["asthma", "breathing difficulty", "chronic cough", "tuberculosis"],
        location: "Rajinder Nagar",
        rating: 4.7,
        reviewCount: 3100
    },
    {
        hospitalName: "Indraprastha Apollo",
        specialty: "Pediatrics",
        symptoms: ["child fever", "baby crying", "child vomiting", "pediatric asthma"],
        location: "Sarita Vihar",
        rating: 4.6,
        reviewCount: 1850
    },
    {
        hospitalName: "Holy Family Hospital",
        specialty: "General Medicine",
        symptoms: ["viral fever", "weakness", "body ache", "headache", "mild cough"],
        location: "Okhla",
        rating: 4.4,
        reviewCount: 1200
    },{
        hospitalName: "Kaya Skin Clinic",
        specialty: "Dermatology",
        symptoms: ["acne", "skin rash", "hair fall", "eczema", "burn scars", "itching"],
        location: "Vasant Kunj",
        rating: 4.5,
        reviewCount: 890
    },
    {
        hospitalName: "DermaWorld Skin Institute",
        specialty: "Dermatology",
        symptoms: ["psoriasis", "hives", "severe allergy", "skin infection", "dark spots"],
        location: "Rajouri Garden",
        rating: 4.6,
        reviewCount: 1120
    },

    // --- Eye Care (Ophthalmology) ---
    {
        hospitalName: "Centre for Sight",
        specialty: "Ophthalmology",
        symptoms: ["blurry vision", "eye pain", "red eyes", "cataract", "dry eyes", "vision loss"],
        location: "Dwarka",
        rating: 4.7,
        reviewCount: 2450
    },
    {
        hospitalName: "Dr. Shroff's Charity Eye Hospital",
        specialty: "Ophthalmology",
        symptoms: ["eye infection", "glaucoma", "watery eyes", "squint", "eye swelling"],
        location: "Daryaganj",
        rating: 4.8,
        reviewCount: 3100
    },

    // --- Ear, Nose & Throat (ENT) ---
    {
        hospitalName: "Aakash Healthcare Super Speciality",
        specialty: "ENT",
        symptoms: ["ear pain", "hearing loss", "sinus", "sore throat", "tonsils", "nose bleed"],
        location: "Dwarka",
        rating: 4.6,
        reviewCount: 1750
    },
    {
        hospitalName: "Sanjeevan Hospital",
        specialty: "ENT",
        symptoms: ["ear discharge", "vertigo", "difficulty swallowing", "chronic cold"],
        location: "Paharganj",
        rating: 4.2,
        reviewCount: 640
    },

    // --- Women's Health (Gynecology) ---
    {
        hospitalName: "Cloudnine Hospital",
        specialty: "Gynecology & Obstetrics",
        symptoms: ["pregnancy", "irregular periods", "pcos", "pelvic pain", "menopause", "severe cramps"],
        location: "Noida Sector 51",
        rating: 4.8,
        reviewCount: 4200
    },
    {
        hospitalName: "Fortis La Femme",
        specialty: "Gynecology & Obstetrics",
        symptoms: ["maternity", "heavy bleeding", "infertility", "endometriosis", "vaginal infection"],
        location: "Greater Kailash",
        rating: 4.9,
        reviewCount: 3800
    },

    // --- Mental Health (Psychiatry & Psychology) ---
    {
        hospitalName: "VIMHANS Nayati Super Speciality",
        specialty: "Psychiatry",
        symptoms: ["anxiety", "depression", "panic attacks", "insomnia", "bipolar", "suicidal thoughts"],
        location: "Nehru Nagar",
        rating: 4.7,
        reviewCount: 1950
    },
    {
        hospitalName: "Tulasi Healthcare",
        specialty: "Psychiatry",
        symptoms: ["schizophrenia", "addiction", "stress", "eating disorder", "hallucinations"],
        location: "Mehrauli",
        rating: 4.5,
        reviewCount: 820
    },

    // --- Oncology (Cancer Care) ---
    {
        hospitalName: "Rajiv Gandhi Cancer Institute",
        specialty: "Oncology",
        symptoms: ["tumor", "lump", "chemotherapy", "radiation", "unexplained weight loss", "cancer"],
        location: "Rohini",
        rating: 4.8,
        reviewCount: 5600
    },
    {
        hospitalName: "Dharamshila Narayana Superspeciality",
        specialty: "Oncology",
        symptoms: ["blood cancer", "breast lump", "biopsy", "prostate issues", "bone pain"],
        location: "Vasundhara Enclave",
        rating: 4.6,
        reviewCount: 3200
    },

    // --- Dental Care ---
    {
        hospitalName: "Clove Dental",
        specialty: "Dentistry",
        symptoms: ["toothache", "bleeding gums", "cavity", "root canal", "wisdom tooth pain", "sensitive teeth"],
        location: "Faridabad",
        rating: 4.4,
        reviewCount: 1550
    },
    {
        hospitalName: "Smile Delhi - The Dental Clinic",
        specialty: "Dentistry",
        symptoms: ["broken tooth", "jaw pain", "dental implant", "swollen gums", "bad breath"],
        location: "New Friends Colony",
        rating: 4.9,
        reviewCount: 2100
    },

    // --- Urology & Nephrology ---
    {
        hospitalName: "Asian Institute of Medical Sciences",
        specialty: "Urology & Nephrology",
        symptoms: ["kidney stones", "urination pain", "blood in urine", "dialysis", "flank pain"],
        location: "Faridabad",
        rating: 4.5,
        reviewCount: 2800
    }
];


const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected successfully!");

        // Insert new data
        console.log("Inserting new mock hospitals...");
        await Hospital.insertMany(mockHospitals);

        console.log("✅ Database seeded successfully!");
        
        // Disconnect after finishing
        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};


seedDatabase();