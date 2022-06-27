require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const fileupload = require("express-fileupload");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

//* Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(fileupload());
app.use(express.urlencoded({ extended: true })); //originally --> false

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use('/getpublic', require('./routes/api/getpublic')); //* see notes in getpublic :)

app.use(verifyJWT); //* everything after this will use the jwt middleware!

//* API Routes  - Commented out until ready to use.
// app.use('/api/account', require('./routes/api/account'));
app.use('/api/ad', require('./routes/api/ad'));
app.use('/api/campaign', require('./routes/api/campaign'));
// app.use('/api/creator', require('./routes/api/creator'));
app.use('/api/playlist', require('./routes/api/playlist'));
// app.use('/api/user_search', require('./routes/api/user_search'));
// app.use('/api/story_rating', require('./routes/api/story_rating'));
app.use('/api/story', require('./routes/api/story'));

// app.use('/api/substription', require('./routes/api/substription'));
// app.use('/api/tag_fit', require('./routes/api/tag_fit'));
app.use('/api/tag', require('./routes/api/tag'));
// app.use('/api/users', require('./routes/api/users'));

app.use('/creator', require('./routes/api/creator'));
app.use('/story', require('./routes/api/story'));
app.use('/search', require('./routes/api/user_search'));
app.use('/subscription', require('./routes/api/subscription'));
app.use('/playlist', require('./routes/api/playlist'));
app.use('/queue', require('./routes/api/queue'));

app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));

// searches, subscriptions, playlists, queue. 
// We want to be able to add, edit, delete each of these.
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => { //* make sure we've connected to the database :)
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});