// routes/animalRoutes.js
import express from 'express';
import * as animalController from '../controllers/animal.js';


const router = express.Router();

// Create a new animal
router.post('/', animalController.createAnimal);

// Get all animals
router.get('/animals', animalController.getAllAnimals);

// Get a specific animal by ID
router.get('/:animalId', animalController.getAnimalById);

// Update an animal by ID
router.put('/:animalId', animalController.updateAnimalById);

// Delete an animal by ID
router.delete('/:animalId', animalController.deleteAnimalById);

// Get animals by raceId
router.get('/animalsByRace/:raceId', animalController.getAnimalsByRaceId);

// Get animals by raceName
router.get('/animalsByRacee/:raceName', animalController.getAnimalsByRaceName);


export default router;
