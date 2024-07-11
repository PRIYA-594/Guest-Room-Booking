import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Swal from 'sweetalert2';
function Book() {
  const { roomid,fromdate,todate } = useParams(); // Destructure roomid from useParams()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(); // to check for error but was not used, used while developing
  const [room, setRoom] = useState(); // Initialize room as null or an empty object
  const dateString1 = fromdate;
  const dateString2 = todate;

  
  // Parse the date strings into moment objects
  const date1 = moment(dateString1, 'DD-MM-YYYY');
  const date2 = moment(dateString2, 'DD-MM-YYYY');

  // Calculate the difference in days
  const totaldays = date2.diff(date1, 'days')+1;

  useEffect(() => {


    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid });
        
        setRoom(response.data); // Assuming the response is JSON and contains room data
        
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error("Error fetching room data:", error);
      }
    };

    if (roomid) {
      if(!localStorage.getItem('currentUser'))
        {
          window.location.href='/login'
        }
      fetchData(); // Call fetchData only if roomid is truthy
    }
  }, [roomid]); // Dependency on roomid


  async function bookroom(){
    const totalamt=totaldays*room.rentPerDay;
    const bookingdetails = {
      room,
      userid:JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamt,
      totaldays,

    }
    try{
      setLoading(true);
      const result = await axios.post('/api/bookings/bookroom',bookingdetails);
      setLoading(false);
      Swal.fire('Congratulations','Your Room Booked Successfully','success').then(result=>{
        window.location.href='/profile';
      });
      //console.log(result.data)
    }catch(error)
    {
      setLoading(false);
      Swal.fire('Oops','Something went wrong','error');
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader /> // loading
      ) : room ? ( // response
        <div>
          <div className="row justify-content-center mt-5 bs1">
            <div className="col-md-7">
              <h1 className="Name">{room.name}</h1>
              {room.imageUrls && room.imageUrls[0] && (
                <img
                  src={room.imageUrls[0]}
                  className="bigimg"
                  alt={room.name}
                />
              )}
            </div>
            <div className="col-md-4 s1">
              <div style={{ textAlign: "left" }}>
                <h1>Booking Details</h1>
                <hr />
                <p>Name: </p>
                <p>From Date: {fromdate} </p>
                <p>To Date: {todate}</p>
                <p>Square Feet: {room.squareFeet}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />
                <p>Total days: {totaldays}</p>
                <p>Rent Per Day: {room.rentPerDay} /-</p>
                <p>Total Amount: {totaldays*room.rentPerDay} /-</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <button className="btn btn-primary" onClick={bookroom}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error message="something went wrong. Try again later"/> //error
      )}
    </div>
  );
}

export default Book;
