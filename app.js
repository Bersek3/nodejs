const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/track/:trackingNumber', async (req, res) => {
    const trackingNumber = req.params.trackingNumber;
    const apiKey = '2b383457e2a848aeb54e660b77933f32';

    try {
        const response = await fetch(`https://api.track123.com/v1/track?tracking_number=${trackingNumber}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Error fetching tracking information' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
