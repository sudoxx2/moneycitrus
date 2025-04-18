const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test API route
app.post('/api/ask', (req, res) => {
    const { prompt } = req.body;

    console.log('Prompt received:', prompt);

    // Simulate AI response
    const fakeAIResponse = `You asked: "${prompt}". Here's a fake AI answer!`;

    res.json({ response: fakeAIResponse });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
