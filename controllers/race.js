// controllers/raceController.js
import Race from '../models/race.js';

export const createRace = async (req, res) => {
    try {
        const { raceName, description, imageUrl } = req.body;
        const newRace = await Race.create({ raceName, description, imageUrl });
        res.status(201).json(newRace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAllRaces = async (req, res) => {
    try {
        const races = await Race.find();
        res.status(200).json(races);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getRaceById = async (req, res) => {
    try {
        const race = await Race.findById(req.params.raceId);
        if (!race) {
            return res.status(404).json({ message: 'Race not found.' });
        }
        res.status(200).json(race);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const updateRaceById = async (req, res) => {
    try {
        const { raceName, description, imageUrl } = req.body;
        const updatedRace = await Race.findByIdAndUpdate(
            req.params.raceId,
            { raceName, description, imageUrl },
            { new: true }
        );
        if (!updatedRace) {
            return res.status(404).json({ message: 'Race not found.' });
        }
        res.status(200).json(updatedRace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const deleteRaceById = async (req, res) => {
    try {
        const deletedRace = await Race.findByIdAndDelete(req.params.raceId);
        if (!deletedRace) {
            return res.status(404).json({ message: 'Race not found.' });
        }
        res.status(200).json({ message: 'Race deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getRaceIdByName = async (req, res) => {
    try {
        const { raceName } = req.params;

        const race = await Race.findOne({ raceName: { $regex: new RegExp(raceName, 'i') } });

        if (!race) {
            return res.status(404).json({ message: 'Race not found.' });
        }

        res.status(200).json({ raceId: race._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};
