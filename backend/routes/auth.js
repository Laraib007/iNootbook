const express = require('express');
const User = require('../modules/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// Creating user but not login required
router.post('/createUser', [
    body('name', "Enter a valid Name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be 5 letters").isLength({ min: 5 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({success, errors: errors.array() })
    }

    try{
        // finding user exist or not
let user = await User.findOne({email: req.body.email})
if(user){
    return res.status(404).json({success, Msg: "Sorry user with this email is already exist" })
}
// creating new user after validating 
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(req.body.password, salt);
     user = await User.create({
        name: req.body.name,
        password: hash,
        email: req.body.email
    })
    const data = {
        user: {
            id: user.id
        }
    }
    const token = await jwt.sign(data, 'shhhhh');
    success = true
    console.log(success, token)
res.json({success, token})
// catching error 
} catch (error){
    console.error({error: error.message})
    res.status(500).send("Some internal error")

}
});
// login user but not login required
router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password can not be blanked").exists()
],
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
  
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})
 if(!user){
    return res.status(400).json({error: "Please enter valid credentials"})
 }
 const passwordCompare = await bcrypt.compare(password, user.password)
 if(!passwordCompare){
    sucess = false
    return res.status(400).json({sucess, error: "Please enter valid credentials"})
 }

 const data = {
    user: {
        id: user.id
    }
}
const token = jwt.sign(data, 'shhhhh');
success = true
res.json({success, token})
// catching error 
} catch (error){
console.error({error: error.message})
res.status(500).send("Some internal error")

}
})
// authenticate user and login required
router.post('/getuser', fetchuser, async (req, res) => {
    try{
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.json({user})
    } catch (error){
        console.error({error: error.message})
        res.status(500).send("Some internal error")
        
        }
})
module.exports = router