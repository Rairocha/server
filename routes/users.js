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
  const userId = req.body._id
  const polId = req.params.polId;
  
  User.findById(userId)
  .then((userToEdit)=>{
    const listFollowing = userToEdit.following.map((id)=>{return id.toString()});
    listFollowing.push(polId);
    userToEdit.following = [... new Set(listFollowing)].map((id)=>{return new mongoose.Types.ObjectId(id)});
    return userToEdit.save()
  })
  .then((updatedUser)=>{
    res.json(updatedUser)
  })
  .catch((err) => {
    console.log(err)
    next(err)})
});

router.get('/following',isLoggedIn, (req, res, next) => {
  const userId = req.body._id
  User.findById(userId)
  .then((following)=>{
    console.log('backend get ',following)
    res.json(following)
  })
  .catch((err) => {
    console.log(err)
    next(err)
})

})
module.exports = router;
