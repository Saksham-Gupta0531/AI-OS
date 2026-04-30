import express from 'express';
import { handleTotalUser, handleAgentByRole,handleShowAllAgent } from '../controllers/adminHandler.js';

const adminRoute = express.Router();

adminRoute.get('/totalUser', handleTotalUser)
adminRoute.post('/addAgentByRole', handleAgentByRole)
adminRoute.get('/showAllAgents',handleShowAllAgent)

export default adminRoute;