import express from 'express';
import { handlePatientRequest } from '../controllers/index.js';
export const searchRouter = express.Router();

searchRouter.post('/smart-search', handlePatientRequest);