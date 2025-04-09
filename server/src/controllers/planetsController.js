import { Router } from "express";
import Planet from '../models/Planet.js';
import catchError from '../util/catchError.js';
import { isAuth, isAdmin } from '../middlewares/authMiddleware.js';

const planetController = Router();

planetController.get("/planets", async (req, res) => {
    try {
        const planets = await Planet.find();

        if (planets.length === 0) {
            return res.status(200).json([]);
        };

        res.status(200).json(planets);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    };
});

planetController.post('/planets/create', isAdmin, isAuth, async (req, res) => {
    const { name, type, image, distanceToSun, size, description } = req.body;
    const comments = [];
    const ownerId = req.user._id;

    if (!name || !type || !image || !distanceToSun || !size || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
    };

    try {
        const planet = await Planet.create({ name, type, image, distanceToSun, size, description, comments, ownerId });
        res.status(201).json(planet);
    } catch (error) {
        const errorMessage = catchError(error)
        res.status(400).json({ message: errorMessage });
    };
});

planetController.delete('/planets/:planetId/delete', isAdmin, isAuth, async (req, res) => {
    const { planetId } = req.params;

    try {
        const planet = await Planet.findByIdAndDelete(planetId);
        res.status(201).json(planet);
    } catch (error) {
        const errorMessage = catchError(error)
        res.status(400).json({ message: errorMessage });
    };
});

planetController.post("/planets", isAuth, isAdmin, async (req, res) => {
    const { name, type, image, distanceToSun, size, description, comments, owner } = req.body;

    try {
        const planet = await Planet.findOne({ name });

        if (planet) {
            return res.status(400).json({ message: 'Planet with this name already exists.' });
        };

        const newPlanet = new Planet({
            name,
            type,
            image,
            distanceToSun,
            size,
            description,
            comments,
            owner
        });

        await newPlanet.save();

        res.status(201).json(newPlanet);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(400).json({ message: errorMessage });
    }
});

planetController.get("/planets/:planetId", async (req, res) => {
    try {
      const planetId = req.params.planetId;
  
      const planet = await Planet.findById(planetId).populate('comments.user', 'firstName lastName');
      console.log(planet);
      
      res.json(planet);
    } catch (err) {
      const error = catchError(err)
      res.status(500).json({ message: error });
    }
});

planetController.post("/planets/:planetId/comment", isAuth, async (req, res) => {
    try {
      const planetId = req.params.planetId;
      const { text } = req.body;

      if (!text || text.trim().length === 0) {
        return res.status(400).json({ message: "Comment text cannot be empty." });
    }
  
      const planet = await Planet.findById(planetId);
  
      const newComment = {
        text,
        createdAt: new Date(),
        user: req.user._id,
      };
  
      planet.comments.push(newComment);
  
      await planet.save();
  
      const populatedPlanet = await Planet.findById(planetId)
        .populate('comments.user', 'firstName lastName') 
        .exec();
  
      res.status(201).json(populatedPlanet);
  
    } catch (err) {
      const error = catchError(err)
      res.status(500).json({ message: error });
    }
});

planetController.post("/planets/:planetId/delete", isAuth, isAuth, isAdmin, async (req, res) => {
    try {
        const planetId = req.params.planetId;

        const planet = await Planet.findById(planetId);

        if (!planet) {
            return res.status(400).json({ message: "Planet not found or already deleted." });
        }

        await planet.remove();

        res.status(200).json({ message: "Planet successfully deleted." });
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});

export default planetController;