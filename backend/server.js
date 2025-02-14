 // ES6 syntax for importing modules
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { connectDB } from './config/db.js'; // Import connectDB function from db.js file
import transactionRoutes from './routes/transactionRoutes.js'; // Import transactionRoutes object from transactionRoutes.js file
import authRoutes from './routes/authRoutes.js'; // Import authRoutes object from authRoutes.js file

dotenv.config(); // Load environment variables from .env file

const __dirname = path.resolve(); // Define the current directory
const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // Call connectDB function
app.use(express.json()); // Middleware to parse JSON data in request body
app.use(cors()); // Middleware to enable CORS

app.get('/', (req, res) => {
    res.send('Server is ready'); // Send message to client
});

// Define routes
app.use('/api/transactions', transactionRoutes); // Routes for transactions
app.use('/auth', authRoutes); // Routes for user authentication

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log('Server started at http://localhost:5000'); // Log message to console to confirm server is running
}); 