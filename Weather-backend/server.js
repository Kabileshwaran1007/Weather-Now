const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/weather', async (req, res) => {
    const { latitude, longitude } = req.query;

    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude,
                hourly: 'temperature_2m',
                past_days: 7,
            },
        });

        const temperature = response.data.hourly.temperature_2m[0]; 
    
        res.json({ temperature });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
