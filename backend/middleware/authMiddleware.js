import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Header token
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // User token
            req.user = await User.findById(decoded.id).select('-passwordHash');

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Unauthorized, no token' });
    }
};