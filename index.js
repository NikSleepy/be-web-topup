const express = require('express');
const corsConfig = require('./config/config');
const routes = require('./routes/route');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // parse json body
app.use(corsConfig);

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
