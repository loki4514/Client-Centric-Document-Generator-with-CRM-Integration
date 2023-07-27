const express = require('express')
const router = express.Router();
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'criticalai'
const fetchuser = require('../middleware/fetchuser')
const cors = require('cors')
// Create Admin using : POST "/api/auth" , Doesnt require Auth
router.post('/createAdmin',[
    // adding validators
    body('name','Enter Valid Name').isLength({min:3}),
    body('email','Enter valid Email').isEmail()
    // .custom(async (value,{req}) => {
    //     const existingemail = await Admin.findOne({'email':value})
    //     if (existingemail) {
    //         throw new Error('Email already exists!!!');

    //     }
    //     return true
    // })
    ,
    body('password','Password length should be atleast 8').isLength({min:3}),
    body('phone_number')
    // .custom(async (value,{req}) => {
    //     const ephone_number = await Admin.findOne({'phone_number':value})

    //     if (ephone_number) {
    //         throw new Error('Phone Number already exists!!!')
    //     }
    //     return true
    // })
    .isNumeric().isLength({ min: 5 }).withMessage("Phone number should be at least 5 digits")


], async (req,res) => {

    // handling the validators errors 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }
    
    console.log(req.body)
    
    // const admin = Admin(req.body)
    // admin.save()
    // .then(() => res.send("Admin created successfully"))
    // .catch(error => res.status(400).send(error.message));
    // res.json({error : 'Please enter a unique value for email'})
    try {
    let admin_e = await Admin.findOne({email:req.body.email})
    if (admin_e) {
        return res.status(400).json({error : "Email already exists"})
    }
    let admin_p = await Admin.findOne({phone_number : req.body.phone_number})
    if (admin_p) {
        return res.status(400).json({error : "Phone Number already exists"})
    }
    // creating a salt 
    const salt = await bcrypt.genSalt(10)

    const secPass = await bcrypt.hash(req.body.password,salt)    
        let admin = await Admin.create({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: secPass
        });

        const data = {
            admin : {
                id : admin.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        // console.log(jwtdata)
        // Code to handle successful creation of the admin object
        // For example, you can send a success response or redirect the user
        res.json({authtoken:authtoken})
        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurred");
    }
    
});

// Auth user or login the user 
router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
], async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }
    let success = false

    const {email,password} = req.body 

    try {
        let admin = await Admin.findOne({email})
        if(!admin) {
            success = false
            return res.status(400).json({error:"Invalid Admin Email"})
        }

        const passwordCompare = await bcrypt.compare(password,admin.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({success,error:"Incorrect Password"})
        }
        // const payload = {
        //     admin : {
        //         id : admin.id
        //     }
        // }

        // const authtoken = jwt.sign(payload,JWT_SECRET)
        success = true
        res.json({success})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error!!!")

    }

})

// Route 3 get login user details post "api/auth/getuser", login required



router.post('/getuser',fetchuser, async (req,res) => {

    try {
        adminid = req.admin.id
        const admin = await Admin.findById(adminid).select("-password")
        res.send(admin)
        console.log(admin)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }

})




module.exports = router