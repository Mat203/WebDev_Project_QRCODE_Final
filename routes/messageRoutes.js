const router = require('express').Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.findDataHandler);

module.exports = router;