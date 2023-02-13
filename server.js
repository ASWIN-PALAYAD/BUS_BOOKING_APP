const { json } = require('body-parser');
const express = require('express');
require('dotenv').config();
const dbconfig = require('./config/dbConfig');


const userRoute = require('./routes/usersRoute');
const busesRoute = require('./routes/busesRoute');

const app = express();
app.use(json());

app.use('/api/users',userRoute);
app.use('/api/buses',busesRoute)











const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`server start at port number : ${port}`));