import bcrypt from 'bcrypt';
import jwt from '../jwt.js';
import User from '../models/User.js';

const userService = {
    async register(firstName, lastName, email, password, rePassword) {
        const user = await User.findOne({ email }).select('email');
        if (user) {
            throw new Error('This email is already registered');
        }
        if (password !== rePassword) {
            throw new Error('Passwords must match!');
        }
        const newUser = await User.create({ firstName, lastName, email, password });
    
        return generateResponse(newUser);
    },
    async login(email, password) {
        const user = await User.findOne({ email });
        const isValid = user ? await bcrypt.compare(password, user.password) : false;
    
        if (!user || !isValid) {
            throw new Error('Invalid email or password!');
        }
    
        return generateResponse(user);
    },
    async updateUser(userId, updateData) {
        try {
            console.log('Attempting to update user:', { userId, updateData });
    
            const user = await User.findById(userId);
    
            if (!user) {
                console.log('User not found with id:', userId);
                throw new Error('User not found');
            }
    
            const updatedFields = {};
    
            if (updateData.firstName) {
                updatedFields.firstName = updateData.firstName;
            }
    
            if (updateData.lastName) {
                updatedFields.lastName = updateData.lastName;
            }
    
            if (updateData.score) {
                updatedFields.score = user.score + (updateData.score || 0);
            }
    
            if (updateData.answers) {
                user.answers.push(...updateData.answers);
                updatedFields.answers = user.answers;
            }
    
            const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });
    
            console.log('User successfully updated:', updatedUser);
            return updatedUser;
        } catch (err) {
            console.error('Failed to update user data:', err);
            throw new Error('Failed to update user data');
        }
    }
};

async function generateResponse(user) {
    const { _id, firstName, lastName, email, score, role } = user;

    const token = await jwt.sign({ _id, firstName, lastName, email, score, role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { _id, firstName, lastName, email, score, accessToken: token, role };
};

export default userService;