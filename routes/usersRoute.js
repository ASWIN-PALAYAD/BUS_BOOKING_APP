const router = require('express').Router();
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

//register new user
router.post('/register',async(req,res)=> {
    try {
        const existingUser  = await User.findOne({email:req.body.email});
        if(existingUser){
            return res.send({
                message:'User already exist',
                success : false,
                data:null
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message:'User created successfully',
            success:true,
            data:null
        })
    } catch (error) {
        res.send({
            message:error.message,
            success:false,
            data : null
        })
    }
})

// login user
router.post('/login',async(req,res)=> {
    try {
        const userExist = await User.findOne({email:req.body.email});
        if(!userExist){
            return res.send({
                message:'User does not exist',
                success : false,
                data:null,
            });
        }
        const passwordMatch = await bcrypt.compare(
            req.body.password,userExist.password
        );
        if(!passwordMatch){
            return res.send({
                message:'Incorrect Password',
                success : false,
                data: null
            })
        }
        const token = jwt.sign(
            {userId:userExist._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );

        res.send({
            message:"User logged in successfully", 
            success:true,
            data: token
        })
    } catch (error) {
        res.send({
            message:error.message,
            success: false,
            data:null
        })
    }
})

//get user by id 
router.post('/get-user-by-id',authMiddleware,async(req,res)=> {
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            message:'User fetched successfully',
            success: true,
            data:user
        })
    } catch (error) {
        res.send({
            message:error.message,
            success:false,
            data:null
        })
        
    }
})

//get all users
// router.post('/get-all-users',authMiddleware,async(req,res)=> {
//     try {
//         const users = await User.find({});
//         res.status(200).send({
//             message:'Users fetched successfully',
//             success:true,
//             data:users
//         });
//     } catch (error) {
//         res.status(500).send({
//             message:error.message,
//             success: false, 
//             data:null
//         });
//     }
// });



module.exports = router 