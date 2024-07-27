const User = require("../models/user")
const { hash, genSalt, compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")


const controlSignin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Both field required" })
    }

    try {
        const user = await User.findOne({ email: email })

        if (user) {
            const isMatch = await compare(password, user.password)

            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Invalid Credentials" })
            }
            else {
                const token = await sign({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username
                }, process.env.JWT_SECRET, { expiresIn: '1h' })

                return res.cookie("token", token).json({ success: true, token })
            }
        }
        else {
            return res.status(404).json({ success: false, message: "User not found" })
        }
    } catch (err) {
        console.error(err);
    }
}
const controlSignup = async (req, res) => {
    const { name, username, email, password } = req.body

    if (!name || !username || !email || !password) {
        return res.status(400).json({ success: false, message: "All field required" })
    }
    try {
        const user = await User.findOne({ $or: [{ email: email }, { username: username }] })
        if (!user) {
            const salt = await genSalt(10)
            const hashedPassword = await hash(password, salt)
            const user = await User.create({ name, username, email, password: hashedPassword })

            return res.status(201).json({ success: true, message: "Register success", user })
        }
        else {
            return res.status(400).json({
                success: false, message: "Username or Email already taken"
            })
        }

    } catch (err) {
        console.error(err)
    }

}

const controlGetUser = async (req, res) => {
    try {
        const user = req.user
        return res.status(200).json({ success: true, user })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const controlLogout = async (req, res) => {
    try {
        res.clearCookie('token', { path: "/" })
        res.status(200).json({ success: true, message: "User Logout" })
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    controlSignin,
    controlSignup,
    controlGetUser,
    controlLogout
}