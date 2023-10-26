const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const apiKey = "259a71f3b0d1ead4e4aa343a3ab424d1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: 'City not provided' });
        }

        const response = await axios.get(`${apiUrl}${city}&appid=${apiKey}`);

        if (response.status === 404) {
            return res.status(404).json({ error: 'City not found' });
        }

        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
