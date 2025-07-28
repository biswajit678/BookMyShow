const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, password: hashedPassword })
        await user.save()
        res.send({ message: 'Signup Successful' })
    } catch (err) {
        res.status(500).send({ message: 'Error signing up' })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (user && await bcrypt.compare(password, user.password)) {
            res.send({ message: 'Login Successful' })
        } else {
            res.status(401).send({ message: 'Invalid Credentials' })
        }
    } catch (err) {
        res.status(500).send({ message: 'Error logging in' })
    }
})
router.get('/test',(req,res)=>{
    res.send('POST request received')
})

module.exports = router;