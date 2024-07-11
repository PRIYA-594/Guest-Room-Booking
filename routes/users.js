const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post("/register",async(req,res)=>{
    const userNew = new User(req.body);
    try{
        const user = await userNew.save();
        res.send("User registered successfully");
    }catch(error){
        return res.status(400).json({error});
    }
});

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;

    try{
        const user = await User.findOne({email:email,password:password})
        if(user)
        {
            const temp={
                name:user.name,
                email:user.email,
                phone:user.phone,
                isHouseOwner:user.isHouseOwner,
                _id:user._id,

            }
            res.send(temp);
        }
        else{
            return res.status(400).json({message:'Login failed'});
        }
    }catch(error)
    {
        return res.status(400).json({error});
    }
});

router.get("/getallusers",async(req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
    }catch(error)
    {
        return res.status(400).json({error});
    }
})


router.post('/requestAdminAccess', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Approve the user's request
        user.isHouseOwner = true;
        await user.save();

        res.json({ message: "Admin access granted successfully" });
    } catch (error) {
        console.error("Error approving admin access:", error);
        res.status(500).json({ error: "Failed to approve admin access" });
    }
});

module.exports=router;