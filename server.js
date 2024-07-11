const express = require('express');
const cors = require('cors');
const app = express();

const dbConfig=require('./db');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');
const bookingRoute = require('./routes/bookings');
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api/rooms',roomsRoute);
app.use('/api/users',usersRoute);
app.use('/api/bookings',bookingRoute);


const port = process.env.PORT || 5000;




app.listen(port,()=>
{
    console.log(`server running in the port ${port}`);
})