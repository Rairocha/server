var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const User = require('../models/User');
const isLoggedIn = require('../middleware/isLoggedIn');
/*const isProfileOwner = require('../middleware/isProfileOwner');
*/
router.get('/user-detail/:userId', (req, res, next) => {
  
  const { userId } = req.params

  User.findById(userId)
    .then((foundUser) => {
      res.json(foundUser)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })

});

router.post('/user-update/:userId', /*isAuthenticated, isProfileOwner,*/ (req, res, next) => {

  const { userId } = req.params

  const { email, password, fullName, location, username } = req.body

  User.findByIdAndUpdate(
    userId,
    {
      email,
      password,
      fullName,
      username
    },
    { new: true }
  )
  .then((updatedUser) => {
    res.json(updatedUser)
  })
  .catch((err) => {
    console.log(err)
    next(err)
  })

})

router.post('/follow/:polId', isLoggedIn, (req, res, next) => {
  const userId = req.user._id
  const polId = req.params.polId;
  
  User.findByIdAndUpdate(userId, {$push : {following: polId}},{new:true})
  .then((updatedUser)=>{
    res.json(updatedUser)
  })
  .catch((err) => {
    console.log(err)
    next(err)})
});

router.post('/unfollow/:polId', isLoggedIn, (req, res, next) => {
  const userId = req.user._id
  const polId = req.params.polId;
  
  User.findByIdAndUpdate(userId, {$pull : {following: polId}},{new:true})
  .then((updatedUser)=>{
    res.json(updatedUser)
  })
  .catch((err) => {
    console.log(err)
    next(err)})
});

router.get('/following',isLoggedIn, (req, res, next) => {
  const userId = req.user._id
  User.findById(userId)
  .then((following)=>{
    res.json(following)
  })
  .catch((err) => {
    console.log(err)
    next(err)
})

})
module.exports = router;
