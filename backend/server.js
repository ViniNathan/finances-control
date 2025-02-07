import express from 'express'; // ES6 syntax

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready'); // Send message to client
});

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000'); // Log message to console to confirm server is running
}); 