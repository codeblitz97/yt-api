import express from 'express';
import cors from 'cors';
import { getAll, getInfo } from 'ytscr';
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'YouTube Data API v3',
    });
});
app.get('/channel', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'No id was provided.',
        });
    }
    if (!id.toString().startsWith('@')) {
        return res.status(400).json({
            message: 'Invalid channel id',
        });
    }
    const response = await getAll(id.toString());
    return { ...response };
});
app.get('/info', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'No id was provided.',
        });
    }
    const response = await getInfo(id.toString());
    return { ...response };
});
app.listen(3000, () => {
    console.log('Server started');
});
//# sourceMappingURL=index.js.map