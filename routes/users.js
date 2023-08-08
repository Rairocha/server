var express = require('express');
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

router.post('/follow/:polId', isLoggedIn, async (req, res, next) => {
  console.log('Followed someone')
  /*try {

      const { sockId, cartId, sockCost } = req.body

      const toUpdate = await Cart.findById(cartId)
  
      toUpdate.subtotal += sockCost
      toUpdate.total = toUpdate.subtotal * toUpdate.tax
      toUpdate.socks.push(sockId)

      const newCart = await toUpdate.save()
  
      const populated = await newCart.populate('socks')
  
          res.json(populated)

  } catch (err) {
      
      res.redirect(307, '/cart/create')
      console.log(err)
      next(err)
  }*/

});

module.exports = router;
