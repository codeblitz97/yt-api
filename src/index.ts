import express from 'express';
import cors from 'cors';
import {
  AllResponse,
  getAll,
  getInfo,
  getShorts,
  getStreams,
  getVideos,
  isLive,
} from 'ytscr';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'YouTube Data API v3',
  });
});

type FilterKeys = keyof AllResponse;

app.get('/channel/videos', async (req, res) => {
  const id: string = req.query.id as string;

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

  const videos = await getVideos(id);

  return res.status(200).json({
    videos,
  });
});

app.get('/channel/shorts', async (req, res) => {
  const id: string = req.query.id as string;

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

  const videos = await getShorts(id);

  return res.status(200).json({
    videos,
  });
});

app.get('/channel/streams', async (req, res) => {
  const id: string = req.query.id as string;

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

  const videos = await getStreams(id);

  return res.status(200).json({
    videos,
  });
});

app.get('/channel/isLive', async (req, res) => {
  const id: string = req.query.id as string;

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

  const videos = await isLive(id);

  return res.status(200).json({
    videos,
  });
});

app.get('/channel', async (req, res) => {
  const id: string | undefined = req.query.id as string | undefined;
  const filter: string | string[] | undefined = req.query.filter as
    | string
    | string[]
    | undefined;

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

  const data: AllResponse = await getAll(id);

  if (!filter) {
    return res.status(200).json(data);
  }

  let filteredData: Partial<Record<FilterKeys, any>> = {};

  if (typeof filter === 'string') {
    const filters: FilterKeys[] = filter.split(',') as FilterKeys[];
    filters.forEach((filterKey) => {
      if (data.hasOwnProperty(filterKey)) {
        filteredData[filterKey] = data[filterKey];
      }
    });
  } else if (Array.isArray(filter)) {
    filter.forEach((filterKey) => {
      if (data.hasOwnProperty(filterKey)) {
        filteredData[filterKey as FilterKeys] = data[filterKey as FilterKeys];
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
