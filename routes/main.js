const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')  
const userController = require('../controllers/user')  


router.get('/', homeController.getIndex)

router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin)    
router.post('/signup', userController.postSignup)

router.get('/logout', userController.logout)    



module.exports = router