const { logger } = require('./logger');

function handleError(res, error, statusCode = 500, message = 'Internal Server Error') {
    logger.error(message, error);
    res.status(statusCode).json({ error: message });
}

module.exports = { handleError };