const axios = require('axios');
const config = require('./config');

module.exports = async function(city) {
    try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: config.google.apiKey,
                cx: config.google.cx,
                q: `chiropractors in ${city}`
            }
        });

        if (response.data.items) {
            return response.data.items.map(item => {
                return {
                    name: item.title,
                    link: item.link,
                    snippet: item.snippet,
                    city: city
                };
            });
        } else {
            return [];
        }
    } catch (error) {
        console.error(`Failed to fetch data for city: ${city}`, error);
        throw error;
    }
};
