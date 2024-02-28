const whitelist = ["http://127.0.0.1:8800", "http://localhost:8800"];

function originFunction (origin, callback) {
    console.log(origin, callback);
    if (whitelist.includes(origin) || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
}

const corsOptions = {
    origin: originFunction
};

module.exports = corsOptions;