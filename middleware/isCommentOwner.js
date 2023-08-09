const Commentary = require('../models/Commentary');


const isCommentOwner = (req, res, next) => {

    console.log("ISCOMMENTOWNER =====>", req.params, req.body)

    /*Commentary.find({})
        .then((foundSock) => {
            if (req.user._id === foundSock.owner.toString()) {
                next()
            } else {
                res.status(401).json({message: "Validation Error"})
            }
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })*/
}

module.exports = isCommentOwner;