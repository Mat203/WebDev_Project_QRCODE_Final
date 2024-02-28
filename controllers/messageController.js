const Message = require('../models/message');
const mongoConnection = require('../connections/mongoConnection');
const mongoose = mongoConnection.mongo;

async function findDataHandler(req, res) {
    const messages = await Message.find();
    res.render('displayData', { list: messages });
}

function createMessage(req, res) {
    res.render('createMessage');
}

function messageHandler(req, res) {
    const { message, sender, receiver, date, isRead } = req.body;
    new Message({ message, sender, receiver, date, isRead }).save();
    res.send(`<script>alert('Message sent');window.location.href = '/new';</script>`);
}

async function idHandler(req, res) {
    const user_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).send('Invalid ID');
    }
    const user = await Message.findOne({ _id: user_id });
    if (user) {
        res.render('displayData', { list: [user] });
    } else {
        res.status(404).send('User not found');
    }
}

module.exports = {
    findDataHandler,
    idHandler,
    createMessage,
    messageHandler,
};