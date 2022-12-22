const express = require('express')
const router = express.Router()
const passport = require('passport')
const homeController = require('../controllers/home')   


router.get('/', homeController.getIndex)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/')
})


router.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})    



module.exports = router