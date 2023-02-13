const router = require('express').Router();
const Bus = require('../models/busModel')

//add bus
router.post('/add-bus',async(req,res)=> {
    try {
        // console.log(req.body);
        const existingBus = await Bus.findOne({number:req.body.number})
        if(existingBus){
            return res.status(200).send({
                success:false,
                message:'Bus already exist'
            })
        }
        // const newBus =  new Bus(req.body)
        // await newBus.save();
        const newBus = await Bus.create(req.body) 
        return res.status(200).send({
            success:true,
            message:'Bus added successfully' 
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
    }
})

module.exports = router;