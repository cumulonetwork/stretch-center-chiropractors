// errorHandler.js

module.exports = function(error, res) {
    console.error('An error occurred:', error);
    res.status(500).json({
        message: 'An error occurred during processing',
        error: error.message
    });
};
