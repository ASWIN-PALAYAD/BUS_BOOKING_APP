const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Booking = require('../models/bookingsModel')
const Bus = require('../models/busModel');

//book a seat 
router.post('/book-seat',authMiddleware, async(req,res)=> {
    console.log(req.body);
    try {
        const newBooking = new Booking({
            ...req.body,transactionId : '1234',
            user : req.body.userId
        })
        console.log(newBooking);
        await newBooking.save();

        const bus = await Bus.findById(req.body.bus);
        bus.seatsBooked = [...bus.seatsBooked,...req.body.seats];
        await bus.save()
        res.status(200).send({
            success: true,
            message: 'Booking successful',
            data:newBooking
        })
    } catch (error) {
        res.status(500).send({
            message:"Booking failed",
            data:error,
            success : false,
        })
    }
});

module.exports = router;