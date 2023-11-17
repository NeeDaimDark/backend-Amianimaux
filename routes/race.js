// routes/raceRoutes.js
import express from 'express';
import * as raceController from '../controllers/race.js';

const router = express.Router();

// Create a new race
router.post('/', raceController.createRace);

// Get all races
router.get('/races', raceController.getAllRaces);

// Get a specific race by ID
router.get('/:raceId', raceController.getRaceById);

// Update a race by ID
router.put('/:raceId', raceController.updateRaceById);

// Delete a race by ID
router.delete('/race/:raceId', raceController.deleteRaceById);

router.get('/raceIdByName/:raceName', raceController.getRaceIdByName);

export default router;
