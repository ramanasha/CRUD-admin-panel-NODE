const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    path = require('path');

// Database connection
const db = require('./config/db');

db.then(() => {
    console.log("CONNECTED TO MONGODB")

    //App 
    const app = express();
    app.use(express.static(path.join(__dirname, 'public')));

    //Parsers
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.use(cookieParser(process.env.DB_SECRET))

    app.set('view engine', 'pug')

    //Authentication middleware
    require('./config/passportStrategy')();
    app.use(session({
        secret: process.env.DB_SECRET,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session())

    //Routes
    const indexRoute = require('./routes/index'),
        loginRoute = require('./routes/login'),
        adminRoute = require('./routes/admin');

    //Middleware to authenticate admin routes
    const loggedIn = require('./middlewares/authentication');
    app.use(loggedIn);

    app.use(indexRoute)
        .use(loginRoute)
        .use(adminRoute);

    //Server listener
    let port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}...`);
    })

}).catch(error => {
    console.log(`ERROR DURING CONNECTION: ${error}`)
})