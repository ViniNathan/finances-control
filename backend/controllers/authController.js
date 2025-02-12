import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
    
            // Verify if user exists
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'Email already registered',  error: error.message });
            }
    
            // Create password hash
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
    
            // Create a new user
            const user = await User.create({
                name,
                email,
                passwordHash
            });
    
            // Create token for user (expires in 30 days)
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );
    
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error: error.message });
        }
    },
    
    login : async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Verify if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
    
            // Verify password
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }
    
            // Create token for user (expires in 30 days)
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );
    
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Login error', error: error.message });
        }
    }

};


export default authController;