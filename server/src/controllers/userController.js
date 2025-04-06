import { Router } from "express";
import userService from "../services/userService.js";
import catchError from "../util/catchError.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const userController = Router();

userController.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, rePassword } = req.body;

    try {
        const user = await userService.register(firstName, lastName, email, password, rePassword);
        res.status(200).json(user);
    } catch (error) {
        const errorMessage = catchError(error)
        res.status(400).json({ message: errorMessage });
    };
});

userController.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.login(email, password);
        res.status(200).json(user);

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

userController.get('/profile/:userId', isAuth, async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const planets = await Planet.find({ 'comments.user': userId })
            .populate('comments.user', 'firstName lastName')
            .exec();

            const userComments = planets.flatMap(planet =>
                planet.comments
                    .filter(comment => comment.user && comment.user._id && comment.user._id.toString() === userId)
                    .map(comment => ({
                        planetName: planet.name,
                        commentText: comment.text,
                        createdAt: comment.createdAt,
                    }))
            );

        res.status(200).json({
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                score: user.score,
                answers: user.answers || [],
                createdAt: user.createdAt,
            },
            comments: userComments
        });
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});

userController.put('/profile/:userId/score', isAuth, async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;

    try {
        const updatedUser = await userService.updateUser(userId, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});

userController.put('/profile/:userId/edit', isAuth, async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;

    try {
        const updatedUser = await userService.updateUser(userId, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});

userController.delete('/profile/:userId', isAuth, async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});

export default userController;