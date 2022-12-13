const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const app = express();
const flash = require('express-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/database');
const regionRoutes = require("./routes/region");
const mainRoutes = require('./routes/main')
const passportLocalMongoose = require('passport-local-mongoose');


const initializePassport = require('./config/passport');
const User = require("./models/User");
const cookieSession = require('cookie-session');
const initialize = require("./config/passport");


//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

initializePassport(passport)

//use public folder
app.use(express.static(__dirname + '/public'));

// Use ejs templates
app.set('view engine', 'ejs')

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Server Running
app.listen(process.env.PORT, () => {
    console.log("Server is running");
  });

// GETs

app.use("/region", regionRoutes);
app.use('/', mainRoutes)

