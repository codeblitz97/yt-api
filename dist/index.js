import express from 'express';
import cors from 'cors';
import { getAll, getInfo } from 'ytscr'; // Update this import based on your actual imports
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'YouTube Data API v3',
    });
});
app.get('/channel', async (req, res) => {
    const id = req.query.id;
    const filter = req.query.filter;
    if (!id) {
        return res.status(400).json({
            message: 'No id was provided.',
        });
    }
    if (!id.startsWith('@')) {
        return res.status(400).json({
            message: 'Invalid channel id',
        });
    }
    const data = await getAll(id);
    if (!filter) {
        return res.status(200).json(data);
    }
    let filteredData = {};
    if (typeof filter === 'string') {
        const filters = filter.split(',');
        filters.forEach((filterKey) => {
            if (data.hasOwnProperty(filterKey)) {
                filteredData[filterKey] = data[filterKey];
            }
        });
    }
    else if (Array.isArray(filter)) {
        filter.forEach((filterKey) => {
            if (data.hasOwnProperty(filterKey)) {
                filteredData[filterKey] = data[filterKey];
            }
        });
    }
    return res.status(200).json(filteredData);
});
app.get('/info', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'No id was provided.',
        });
    }
    const response = await getInfo(id.toString());
    return res.status(200).json({ ...response });
});
app.listen(3000, () => {
    console.log('Server started');
});
//# sourceMappingURL=index.js.map