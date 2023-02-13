const { json } = require('body-parser');
const express = require('express');
require('dotenv').config();
const dbconfig = require('./config/dbConfig');


const userRoute = require('./routes/usersRoute');
const busesRoute = require('./routes/busesRoute'); 
const bookingsRoute = require('./routes/bookingsRoute')

const app = express();
app.use(json());

app.use('/api/users',userRoute);
app.use('/api/buses',busesRoute);
app.use('/api/bookings',bookingsRoute);











const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`server start at port number : ${port}`));