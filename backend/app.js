/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require ('path');
const checkJwt = require('express-jwt');
const jwt = require("jsonwebtoken");    // Validates access tokens automatically

/**** Configuration ****/
const appName = "Express"; // Change the name of your server app!
const port = process.env.PORT || 8000; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.
require('dotenv').config({path: '../client/.env'});


app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(express.static('../build')); // Needed for serving production build of React



/*** Database ***/
const mongoDb = require('./db')(mongoose);

//Open paths that do need login. Any route included here is protected!
let openPaths = [
    { url: '/api/users/authenticate', methods: ['POST'] },
    { url: '/api/users/authenticate', methods: ['GET'] },
    { url: '/', methods: ['GET'] },
    { url: '/login', methods: ['GET'] },
    { url: '/api/suggestions', methods: ['GET'] },
    { url: '../client/build', methods: ['GET'] },
    { url: '/static/js/main.fe7cc1c0.chunk.js', methods: ['GET'] },
    { url: '/static/js/2.876b61f7.chunk.js', methods: ['GET'] },
    { url: '/static/css/main.5ecd60fb.chunk.css', methods: ['GET'] },
    { url: '/static/js/main.fe7cc1c0.chunk.js', methods: ['GET'] },
    { url: '/favicon.ico', methods: ['GET'] },
    { url: '/favicon.ico', methods: ['POST'] },
    { url: '/manifest.json', methods: ['GET'] },
    { url: '/manifest.json', methods: ['POST'] },
    { url: '/static/js/2.876b61f7.chunk.js', methods: ['GET'] },
    { url: '/static', methods: ['POST'] },
    { url: '/static/js/2.876b61f7.chunk.js', methods: ['POST'] },
    { url: '/index.html', methods: ['POST'] },
    { url: '/index.html', methods: ['GET'] },
    { url: '/build', methods: ['POST'] },
    { url: '/build/index.html', methods: ['POST'] },
    { url: '/static/js/main.264b128a.chunk.js', methods: ['GET'] },
    { url: '/static/js/main.fc5224c9.chunk.js', methods: ['GET'] }

];

 // Validate the user using authentication. checkJwt checks for auth token.
    const secret = process.env.ACCESS_TOKEN_SECRET;
    app.use(checkJwt({ secret: secret, algorithms: ['RS256'] }).unless({ path : openPaths }));

// // This middleware checks the result of checkJwt
    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') { // If the user didn't authorize correctly
            res.status(401).json({ error: err.message }); // Return 401 with error message.
        } else {
            next(); // If no errors, forward request to next middleware or route
        }
    });

/**** Routes ****/
//login
 const usersRouter = require('./routes/users_router')(secret);
 app.use('/api/users', usersRouter);

 //logout
 app.use('/api/users/logout', usersRouter);


// Return all suggestions in data
app.get('/api/suggestions', async (req, res) =>{
    const suggestions = await mongoDb.getAllSuggestions();
    console.log(suggestions);
    res.json(suggestions);
});

app.get('/api/suggestions/:id', async (req, res) =>{
    let id = req.params._id;
    const suggestion = await mongoDb.getSuggestion(id);
    res.json(suggestion);
});


//Post Suggestion
app.post('/api/suggestions/', async (req, res) => {
    let suggestion = {
        title: req.body.title, //important
    };
    const newSuggestion = await mongoDb.createSuggestion(suggestion);
    res.json(newSuggestion);
});

//PostSignature
app.post('/api/suggestion/:id', async (req, res) => {
    let signature = {
        suggestionId: req.params.id,
    };
    const newSignature = await mongoDb.createSignature(signature);
    res.json(newSignature);
});


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'..', 'client', 'build', 'index.html'));
  });

// app.get('*', (req, res) =>
//     res.sendFile(path.resolve('..', 'client', 'build', 'index.html', { root: __dirname }))
// );


/**** Start! ****/
const uri = process.env.REACT_APP_MONGODB_URL;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async() =>{
        await mongoDb.fillIfEmpty();
        await app.listen(port); //API
        console.log(`API running on : ${port}`);
    })
    .catch(error => console.log(error));
