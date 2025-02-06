import axios from 'axios';
import { YOUTUBE_KEY } from '../config/envariables.config.js';

export const searchYoutube = async (consulta) => {
    try {
        const url = "https://www.googleapis.com/youtube/v3/search"

        if (!consulta || consulta.trim() === "") {
            return false;
        }

        const params = {
            "part": "snippet",
            "q": consulta,
            "type": "video",
            "maxResults": 3,
            "key": YOUTUBE_KEY
        };

        const response = await axios.get(url, { params });

        if (response.status === 200) {
            const items = response.data.items || [];

            if (items.length > 0) {
                const randomItem = items[Math.floor(Math.random() * items.length)];
                const videoId = randomItem.id.videoId;
                return `https://www.youtube.com/watch?v=${videoId}`;
            }
        }
        return false;
    } catch (error) {
        return false;
    }
};