const path = require('path');
const express = require('express'); //web framework
const dotenv = require('dotenv'); //load .env file
const morgan = require('morgan'); //logger
const colors = require('colors'); //terminal color
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db'); //connect to mongodb

// load env vars
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold));

// Handle unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
    server.close(() => process.exit(1));
});
