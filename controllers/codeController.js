const QRCode = require('qrcode');
const QRCodeModel = require('../models/qrcode');
const { logger } = require('../helpers/logger');
const { myCache } = require('../helpers/cache');

async function findDataHandler(req, res) {
    const key = 'displayDataStructure';
    const value = myCache.get(key);

    if (value == undefined) {
        res.render('displayData', function(err, html) {
            if (err) {
                res.status(500).send('An error occurred');
            } else {
                myCache.set(key, html);
                res.send(html);
            }
        });
    } else {
        res.send(value);
    }
}

async function getAllQRCodes(req, res) {
    try {
        const qrcodes = await QRCodeModel.find().sort({ important: -1 });
        logger.info(qrcodes); 
        res.render('qr-archive', { qrcodes: qrcodes }); 
    } catch (error) {
        logger.error('Error fetching QR codes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function generateQRCode(req, res) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    try {
        const name = req.body.name;
        const link = req.body.data;
        const important = req.body.important === 'on';

        if (!urlRegex.test(link)) {
            logger.error('Error generating QR code: Invalid URL provided');
            return res.status(400).json({ error: 'Invalid URL' });
        }

        const qrCodeImage = await QRCode.toDataURL(link);
        const qrCode = new QRCodeModel({ name: name, link: link, important: important, image: qrCodeImage });
        await qrCode.save();
        logger.info(`QR code generated successfully: ${qrCode._id}`);
        res.redirect('/display-qr/' + qrCode._id);
    } catch (error) {
        logger.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function displayQRCode(req, res) {
    try {
        const qrCode = await QRCodeModel.findById(req.params.id);
        res.render('display-qr', { qrCode: qrCode });
    } catch (error) {
        logger.error('Error displaying QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getQRCodeImage(req, res) {
    try {
        const qrCode = await QRCodeModel.findById(req.params.id);
        const qrCodeImage = await QRCode.toDataURL(qrCode.link);
        logger.info(qrCodeImage);
        res.send(qrCodeImage);
    } catch (error) {
        logger.error('Error generating QR code image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteQR(req, res) {
    try {
        const id = req.params.id;
        await QRCodeModel.findByIdAndDelete(id);
        res.redirect('/qrcodes');
    } catch (error) {
        logger.error('Error deleting QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateQRCode(req, res) {
    try {
        const id = req.params.id;
        const newName = req.body.name;
        const newImportant = req.body.important === 'on';
        await QRCodeModel.findByIdAndUpdate(id, { name: newName, important: newImportant });
        res.redirect('/display-qr/' + id);
    } catch (error) {
        logger.error('Error updating QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUpdatePage(req, res) {
    try {
        const qrCode = await QRCodeModel.findById(req.params.id);
        res.render('update-qr', { qrCode: qrCode });
    } catch (error) {
        logger.error('Error fetching QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { findDataHandler, getAllQRCodes, generateQRCode, displayQRCode, getQRCodeImage, deleteQR, updateQRCode, getUpdatePage };
