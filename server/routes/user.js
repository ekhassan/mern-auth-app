const router = require('express').Router()
const { controlSignin, controlSignup, controlGetUser, controlLogout } = require('../controllers/user')
const { authMiddleware } = require('../middleware/authMiddleware')

router.post("/signin", controlSignin);
router.post("/signup", controlSignup);
router.get("/get-user", authMiddleware, controlGetUser);
router.get("/logout", authMiddleware, controlLogout);

module.exports = router