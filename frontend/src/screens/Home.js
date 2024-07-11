import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Room from "../components/room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from "antd";
import "antd/dist/reset.css";

const { RangePicker } = DatePicker;

function Home() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  const [searchkey,setsearchkey]=useState('');
  const [type,settype]=useState('all');

  const [duplicaterooms, setduplicaterooms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getAllRooms")).data;
        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  
  const onRangeChange = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      setfromdate(dateStrings[0]);
      settodate(dateStrings[1]);

      const filteredRooms = duplicaterooms.filter(room => {
        if (room.currentBookings.length > 0) {
          for (let booking of room.currentBookings) {
            // Convert booking dates to moment objects
            const bookingStartDate = moment(booking.fromdate, "DD_MM_YYYY");
            const bookingEndDate = moment(booking.todate, "DD_MM_YYYY");

            // Convert selected dates to moment objects
            const selectedStartDate = moment(dateStrings[0], "DD-MM-YYYY");
            const selectedEndDate = moment(dateStrings[1], "DD-MM-YYYY");

            // Check for overlap
            if (
              selectedStartDate.isBetween(bookingStartDate, bookingEndDate, null, '[]') ||
              selectedEndDate.isBetween(bookingStartDate, bookingEndDate, null, '[]')
            ) {
              return false; // Overlap found, exclude this room
            }
          }
        }
        return true; // Room is available or has no bookings
      });

      setrooms(filteredRooms);
    } else {
      // Clear date range
      setfromdate(null);
      settodate(null);
      setrooms(duplicaterooms);
    }
  };

  function filterBySearch()
  {

    const tempRooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()));
    setrooms(tempRooms);

  }

  function filterByType(e)
  {
    settype(e)
    if(e!=='all')
    {
      const tempRooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase());

      setrooms(tempRooms);
    }
    else{
      setrooms(duplicaterooms);
    }

  }


  return (
    <div className="container">
      <div className="row mt-5 bs1">
        <div className="col-md -4">
          <RangePicker format={"DD-MM-YYYY"} onChange={onRangeChange} />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="search rooms"
          value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-4">
          <select className="form-control" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
            <option value="all">All</option>
            <option value="Deluxe">Delux</option>
            <option value="Non-delux">Non-Delux</option>
            <option value="Standard">Standard</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader /> //loading
        ) : ( // response
          rooms.map((room) => {
            return (
              <div className="col-md-9">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        ) }
      </div>
    </div>
  );
}

export default Home;
