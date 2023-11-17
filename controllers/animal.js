// controllers/animalController.js
import Animal from '../models/animal.js';
import mongoose from "mongoose";
import Race from "../models/race.js";
export const createAnimal = async (req, res) => {
    try {
        const { animalName, race, age, description, imageUrl, owner, location } = req.body;
        const newAnimal = await Animal.create({ animalName, race, age, description, imageUrl, owner, location });
        res.status(201).json(newAnimal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find().populate('race');
        res.status(200).json(animals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.animalId).populate('race');
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found.' });
        }
        res.status(200).json(animal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const updateAnimalById = async (req, res) => {
    try {
        const { animalName, race, age, ownerName, phoneNumber, location } = req.body;
        const updatedAnimal = await Animal.findByIdAndUpdate(
            req.params.animalId,
            { animalName, race, age, ownerName, phoneNumber, location },
            { new: true }
        ).populate('race');
        if (!updatedAnimal) {
            return res.status(404).json({ message: 'Animal not found.' });
        }
        res.status(200).json(updatedAnimal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const deleteAnimalById = async (req, res) => {
    try {
        const deletedAnimal = await Animal.findByIdAndDelete(req.params.animalId);
        if (!deletedAnimal) {
            return res.status(404).json({ message: 'Animal not found.' });
        }
        res.status(200).json({ message: 'Animal deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAnimalsByRaceId = async (req, res) => {
    try {
        const { raceId } = req.params;

        // Check if raceId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(raceId)) {
            return res.status(400).json({ message: 'Invalid raceId.' });
        }

        const animals = await Animal.find({ race: raceId }).populate('race');

        if (!animals || animals.length === 0) {
            return res.status(404).json({ message: 'No animals found for the given raceId.' });
        }

        res.status(200).json(animals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};
export const getAnimalsByRaceName = async (req, res) => {
    try {
        const { raceName } = req.params;

        const animals = await Animal.find({ race: new RegExp(raceName, 'i') }).populate('race');

        if (!animals || animals.length === 0) {
            return res.status(404).json({ message: `No animals found for the given raceName: ${raceName}.` });
        }

        res.status(200).json(animals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};






