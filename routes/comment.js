var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const isCommentOwner = require('../middleware/isCommentOwner');

const Commentary = require('../models/Commentary');

router.get('/:polId',/* isLoggedIn,*/ (req, res, next) => {
    const {polId} = req.params
    
    Commentary.find({politician:polId})
    .populate('owner')
    .then((c)=>{
        res.json(c)
    })
    .catch((err) => {
        console.log(err)
        next(err)
      })
  
  });

router.post('/create/:polId', isLoggedIn, (req, res, next) => {

    const userId = req.user._id
    const {polId} = req.params
    const { text } = req.body
    console.log('backend post comment',userId,polId,text)
  
    Commentary.create({  content: text, owner: userId, politician:polId })

    .then((comment) => {
        //console.log(comment)
        res.status(200).json({message:'comment created'})
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "Internal Server Error 1" });
    })
  
  })

  
  router.post('/edit/:commentId', isLoggedIn, /*isCommentOwner,*/ (req, res, next) => {

    const { commentId } = req.params
    const { text } = req.body

    Commentary.findByIdAndUpdate(commentId,{$set:{'content':text}},{new:true})
    .then((editComment) => {
      res.status(200).json(editComment)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
  
  })
router.post('/delete/:commentId', isLoggedIn, /*isCommentOwner,*/ (req, res, next) => {
  
    const { commentId } = req.params
    Commentary.findByIdAndDelete(commentId)
    .then((deletedComment) => {
      console.log('deleted',commentId )
      res.json(deletedComment)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
  
  })
  
  
  
  module.exports = router;