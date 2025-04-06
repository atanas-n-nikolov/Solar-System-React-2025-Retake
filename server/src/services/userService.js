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
    }
};

async function generateResponse(user) {
    const { _id, firstName, lastName, email, score } = user;

    const token = await jwt.sign({ _id, firstName, lastName, email, score }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { _id, firstName, lastName, email, score, accessToken: token };
};

export default userService;