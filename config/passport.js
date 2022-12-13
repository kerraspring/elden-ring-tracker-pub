const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const userSchema = User._userSchema.statics;



function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
      const user = await User.find(User => User.email === email)
      console.log(email, user)
      if (user == null) {
        return done(null, false, {message: 'No user with that email'})
      }

      try {
        if (await bcrypt.compare(password, user.password)) {

        } else {
          return done(null, false, {message: 'Incorrect Password'})
        }
      } catch(err) {
        return done(err)
      }
  }
  // passport.use(userSchema.createStrategy());
  // passport.serializeUser(userSchema.serializeUser());
  // passport.deserializeUser(userSchema.deserializeUser());
  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))

  // turns a user into a unique identifier used for the session (i.e. its _id)
  passport.serializeUser((user, done) => done(undefined, user._id))

  // takes a unique identifier from the session and returns a user from that _id
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(undefined, user)
  })
}

module.exports = initialize