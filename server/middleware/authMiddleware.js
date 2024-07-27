const User = require('../models/user')
const { verify, decode } = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token
    try {
        if (token) {
            const decodeToken = verify(token, process.env.JWT_SECRET);

            const user = await User.findOne({ _id: decodeToken.id }).select("-password")

            req.user = user
            req.userId = user._id
            req.token = token
            next()
        }
        else {
            res.status(401).json({ success: false, message: "Unauthorized" })
        }

    } catch (err) {
        console.error(err);
    }

}


module.exports = { authMiddleware }