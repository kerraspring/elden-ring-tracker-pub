const mongoose = require("mongoose");
const User = require("../models/User")
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require('express-flash')
const session = require('express-session')


    exports.getLogin = async (req, res) => {
        try {
            res.render('login.ejs')
        } catch (err) {
            console.log(err);
        }
    }

    exports.postLogin = async (req, res, next) => {
      passport.authenticate('local',
      (err, user, info) => {
        console.log('login', user)
        if (err) {
          return next(err);
        }
    
        if (!user) {
          return res.redirect('/login');
        }
    
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
    
          return res.redirect('/');
        });
    
      })(req, res, next);
    };

    exports.postSignup = async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                name: req.body.userName,
                email: req.body.email,
                password: hashedPassword,
                completedItems: []
            })
            await user.save()
            req.login(user, (err) => {
              if (err) throw err
              res.redirect('/')
            })
            console.log(user)
        } catch (err) {
            console.log(err);
        }
    }

    // exports.logout = (req, res) => {
    //     req.logout(() => {
    //       console.log('User has logged out.')
    //     })
    //     req.session.destroy((err) => {
    //       if (err)
    //         console.log("Error : Failed to destroy the session during logout.", err);
    //       req.user = null;
    //       res.redirect("/");
    //     });
    //   };