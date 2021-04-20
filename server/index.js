if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const app = express();
// Variables
const protocol = process.env.PROTOCOL || 'http';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN || 'https://digit-recognizer-ai.netlify.app';

// Logger
app.use((req, res, next) => {
	console.log(`${new Date()} - ${req.method} request for ${req.url}`);
	next();
});
//Cors Enable
app.use(
	cors({
		origin: origin,
		optionsSuccessStatus: 200, // For legacy browser support
	})
);
// Body Parser
app.use(express.json());
// Routes
app.post('/predict', require('./predict'));

// Listening
app.listen(port, (e) => {
	console.log(`\nApp is running at ${protocol}://${host}:${port}`);
});
