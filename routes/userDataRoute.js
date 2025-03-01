const express = require('express')
const router = express.Router()
const {displayUserData} = require('../controllers/userDataController')

router.route('/').post(displayUserData)

module.exports = router