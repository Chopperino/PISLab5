import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

const myInfo = {
    name: "Denys",
    surname: "Mamchyk",
    course: 2,
    group: "IS-21"
};

app.use(express.static('public'));

app.get('/api/data', async (req, res) => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/:info', (req, res) => {
    if (req.params.info === 'is-21fiot-22-049') {
        res.json(myInfo);
    } else {
        res.status(400).json({ error: 'Invalid parameters' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
