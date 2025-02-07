 // ES6 syntax for importing modules
import express from 'express';
import dotenv from 'dotenv';

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready'); // Send message to client
});

console.log(process.env.MONGO_URI);


app.listen(5000, () => {
    console.log('Server started at http://localhost:5000'); // Log message to console to confirm server is running
}); 