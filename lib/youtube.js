import { google } from 'googleapis';

// Get API key from environment, fallback to public key if needed
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  console.error('YouTube API key is not configured');
}

const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY
});

export async function getPlaylistItems(playlistId, maxResults = 50) {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured');
    }
    const response = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      maxResults: maxResults,
      playlistId: playlistId
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    throw error;
  }
}

export async function getVideoDetails(videoId) {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured');
    }
    const response = await youtube.videos.list({
      part: ['snippet', 'statistics', 'contentDetails'],
      id: [videoId]
    });
    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
}

export async function searchVideos(query, maxResults = 25) {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured');
    }
    const response = await youtube.search.list({
      part: ['snippet'],
      q: query,
      type: ['video'],
      maxResults: maxResults
    });
    return response.data.items;
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
}

export default youtube; 