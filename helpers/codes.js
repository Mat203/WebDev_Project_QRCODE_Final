const QRCode = require('../models/qrcode');

function saveQRCodeInDatabase(name, link, important) {
    const qrCode = new QRCode({ name: name, link: link, important: important });
    return qrCode.save();
}

function deleteQRCode(id) {
    fetch('/delete-qr/' + id, { method: 'DELETE' })
        .then(res => window.location.href = '/')
        .catch(err => console.error(err));
}

module.exports = {
    saveQRCode: saveQRCodeInDatabase,
    deleteQRCode: deleteQRCode
};
