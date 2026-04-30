require('dotenv').config(); 
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const indexRoute = require('./routes/index');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./models/index');
const passport = require('passport');

const setupSwagger = require('./Docs/swagger'); 

require('./config/passport')(passport);
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom sanitize to avoid Node 22+ req.query readonly error
app.use((req, res, next) => {
    if (req.body) mongoSanitize.sanitize(req.body);
    if (req.params) mongoSanitize.sanitize(req.params);
    if (req.headers) mongoSanitize.sanitize(req.headers);
    next();
});

// Connect Database
connectDB(MONGO_URL);

app.use(cors({
    origin: [
        'http://localhost:5173',
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(cookieParser());
app.use(passport.initialize());

setupSwagger(app, PORT);

// Base API
app.use('/api', indexRoute);

// Testing Route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Backendless</h1>");
});

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}/`);
});