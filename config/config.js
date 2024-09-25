const cors = require('cors');

const corsConfig = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

module.exports = cors(corsConfig);