const axios = require('axios');
const config = require('./config');

module.exports = async function(chiropractors) {
    let contactList = [];

    for (let chiropractor of chiropractors) {
        try {
            const response = await axios.get(chiropractor.link);

            const emailMatch = response.data.match(/[\w.-]+@[\w.-]+\.\w+/g);
            const addressMatch = response.data.match(/(\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.\s)?(\b\w*\b\s){1,2}\w*\./g);

            if (emailMatch && addressMatch) {
                contactList.push({
                    name: chiropractor.name,
                    email: emailMatch[0],
                    address: addressMatch[0],
                    city: chiropractor.city
                });
            }
        } catch (error) {
            console.error(`Failed to fetch contact info for: ${chiropractor.name}`, error);
        }
    }

    return contactList;
};
