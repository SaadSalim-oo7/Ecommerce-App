const express = require('express');
const router = express.Router();
const userSchema = require('../Model/userSchema')

const {
    registerUser, getAUser,
    getAllUser, updateUserdetails,
    checkUserExists, deleteUser, 
    verifyUser, isLoggedIn, isAdmin, } = require('../Controller/userCtrl')

router.post('/register', registerUser)

router.post('/login', verifyUser)

router.get('/getAllUser', isLoggedIn, getAllUser )

router.get('/getAUser/:id', checkUserExists, getAUser )

router.put('/updateuser/:id', checkUserExists, updateUserdetails)

router.delete('/deleteuser/:id', isLoggedIn, isAdmin, checkUserExists, deleteUser )

module.exports = router;