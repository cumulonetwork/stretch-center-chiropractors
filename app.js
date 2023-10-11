const express = require('express');
const dotenv = require('dotenv');
const chiropractorScraper = require('./chiropractorScraper');
const contactListGenerator = require('./contactListGenerator');
const errorHandler = require('./errorHandler');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
    try {
        const cities = require('./cities.json');
        let contactList = [];

        for (let city of cities) {
            const chiropractors = await chiropractorScraper(city);
            const contacts = await contactListGenerator(chiropractors);
            contactList = contactList.concat(contacts);
        }

        res.json(contactList);
    } catch (error) {
        errorHandler(error, res);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
