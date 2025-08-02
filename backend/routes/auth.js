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
        console.log('Signup error:', err.message);
        res.status(500).send({ message: 'Error signing up: ' + err.message })
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
        console.log('Login error:', err.message);
        res.status(500).send({ message: 'Error logging in: ' + err.message })
    }
})
router.get('/test',(req,res)=>{
    res.send('POST request received')
})

module.exports = router;