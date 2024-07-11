const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const rm = require("./rooms")

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamt, totaldays } = req.body;

  if(room.minimumBook <= totaldays && room.maximumBook >=totaldays)
  {
    console.log('book')
  }
  else
  {
    console.log('No Book')
  }
 // console.log("Request Body:", req.body);

  try {
    const newBooking = new Booking({
      room:room.name,
      roomid:room._id,
      userid,
      fromdate,
      todate,
      totalamt,
      totaldays,
      transactionid: "1234",
    });

    const booking = await newBooking.save();

        const roomt = await Room.findById(room._id);
        if (!roomt) {
            return res.status(404).json({ error: "Room not found" });
        }

        roomt.currentBookings.push({
            bookingid: booking._id,
            fromdate,
            todate,
            userid,
            status: booking.status // Assuming you have a status field in Booking model
        });

        await roomt.save();

    res.send("Room Booked successfully");
  } catch (error) {
    console.error("Error booking room:", error.message);
    return res.status(400).json({ error: error.message });
  }
});

router.post('/getbookingsbyuserid',async(req,res)=>{
  const userid = req.body.userid;
  try{

    const booking = await Booking.find({userid:userid})
    res.send(booking)

  }catch(error)
  {
    return res.status(400).json({error});
  }
})

router.post('/cancelbooking',async(req,res)=>{
  const { bookingid, roomid } = req.body;
  
  try {
    // Find the booking by ID
    const bookingitem = await Booking.findOne({_id: bookingid});
    // Update booking status to 'canceled'
    bookingitem.status = 'canceled';
    await bookingitem.save();
    console.log(bookingitem)

    // Find the room by ID
    const room = await Room.findOne({_id:roomid});
    
    const bookings = room.currentBookings 
    // Filter out the canceled booking from current bookings
    const temp= bookings.filter(b => b.bookingid.toString() !== bookingid.toString());
    room.currentBookings=temp
    console.log(room)
    // Save the updated room document
   await room.save();

    res.send('Your booking is cancelled successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }

});

router.get("/getallbookings",async(req,res)=>{

  try{

    const bookings = await Booking.find()
    res.send(bookings)
  }catch(error)
  {
    return res.status(400).json({error});
  }
})
module.exports = router;
