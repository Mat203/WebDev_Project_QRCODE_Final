const router = require('express').Router();
const qrCodeController = require('../controllers/codeController');

router.get('/', qrCodeController.findDataHandler);
router.post('/generate-qr', qrCodeController.generateQRCode);
router.get('/display-qr/:id', qrCodeController.displayQRCode);
router.get('/qrcode-image/:id', qrCodeController.getQRCodeImage);
router.get('/qrcodes', qrCodeController.getAllQRCodes);
router.delete('/delete-qr/:id', qrCodeController.deleteQR);
router.get('/update-qr/:id', qrCodeController.getUpdatePage);
router.post('/update-qr/:id', qrCodeController.updateQRCode);


module.exports = router;
