import axios from 'axios';

export default async function handler(req, res) {
  const { skill } = req.query;

  if (!skill) {
    return res.status(400).json({ error: 'Skill parameter is required' });
  }

  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    if (!API_KEY) {
      throw new Error('YouTube API key is not configured');
    }

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: `${skill} tutorial`,
        type: 'video',
        maxResults: 1,
        key: API_KEY,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      const videoId = response.data.items[0].id.videoId;
      res.status(200).json({ videoId });
    } else {
      res.status(404).json({ error: 'No video found' });
    }
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      res.status(error.response.status).json({ error: 'Error from YouTube API', details: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      res.status(500).json({ error: 'No response received from YouTube API' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
      res.status(500).json({ error: 'Error setting up YouTube API request', message: error.message });
    }
  }
}