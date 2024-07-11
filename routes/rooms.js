const express = require("express");
const router = express.Router();


const Room = require('../models/room');

router.get("/getAllRooms",async (req,res)=>{


    try
    {
        const rooms = await Room.find({});
        //return res.json({rooms});
        res.send(rooms);

    }catch(error)
    {
        return res.status(400).json({message:error});
    }

});


router.post("/getroombyid",async (req,res)=>{

    const roomid =req.body.roomid;
   
    try
    {
        const room = await Room.findOne({_id : roomid});
        return res.send(room);

    }catch(error)
    {
        return res.status(400).json({message:error});
    }

});

router.post('/addroom',async(req,res)=>{
    try {
        const newroom = new Room(req.body);
        await newroom.save()
        res.send('New Room Added Successfully');
    } catch (error) {
        return res.status(400).json({error})
    }
})


router.put('/updateroom/:id', async (req, res) => {
    const { rentPerDay, minimumBook, maximumBook } = req.body;
  
    try {
      const room = await Room.findById(req.params.id);
      if (!room) return res.status(404).json({ message: 'Room not found' });
  
      room.rentPerDay = rentPerDay !== undefined ? rentPerDay : room.rentPerDay;
      room.minimumBook = minimumBook !== undefined ? minimumBook : room.minimumBook;
      room.maximumBook = maximumBook !== undefined ? maximumBook : room.maximumBook;
  
      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) return res.status(404).json({ message: 'Room not found' });
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
router.delete('/deleteroom/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRoom = await Room.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json({ message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ error: "Failed to delete room" });
    }
});

module.exports=router;