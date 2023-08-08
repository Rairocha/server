var express = require("express");
var router = express.Router();

//const isLoggedIn = require("../middleware/isLoggedIn");

//const User = require("../models/User");
const Politician = require("../models/Politician");

router.get('/all-politicians',(req, res, next) =>{
     Politician.find()//{in_office: true}).sort({id: 1})
    .then((allP)=>{
        res.json(allP)
        //console.log('Politicians return', allP.length)
    })
    .catch((err)=>{
        console.log(err)
        next(err)
    })
})

module.exports = router;