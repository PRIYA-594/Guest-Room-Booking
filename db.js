const mongoose = require("mongoose");

var mongo_url = "mongodb://127.0.0.1:27017/GUEST_ROOM_BOOKING_DB"

mongoose.connect(mongo_url, {

}).then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
