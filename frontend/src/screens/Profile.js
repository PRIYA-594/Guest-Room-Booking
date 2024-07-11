import React, { useEffect, useState } from "react";
import { Radio, Space, Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Divider, Tag } from "antd";
import { Link } from "react-router-dom";

function Profile() {
  const items = [
    {
      key: "1",
      label: "Profile",
      children: <MyProfile />,
    },
    {
      key: "2",
      label: "Bookings",
      children: <MyBookings />,
    },
  ];

  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  });

  return (
    <div className="mt-5 ml-3 ">
      <Tabs
        tabPosition="left"
        items={items}
        indicator={{
          size: (origin) => origin - 20,
        }}
      />
    </div>
  );
}

export default Profile;

export function MyProfile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <h1>My Profile</h1>
      <br />
      <h1>Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <h1>isAdmin: {user.isHouseOwner ? "YES" : "NO"}</h1>
      {user.isHouseOwner ? (
        <div style={{ textAlign: "center" }}>
          <Link to="/admin">
            <button className="btn btn-primary">ADMIN PANEL</button>
          </Link>
        </div>
      ):(
        <div style={{ textAlign: "center" }}>
          <Link to="/adminAccess">
            <button className="btn btn-primary">GET ADMIN ACCESS</button>
          </Link>
        </div>
      )}
    </div>
  );
}
export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true);
        const room = await (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userid: user._id,
          })
        ).data;
        console.log(room);
        setbookings(room);
        setloading(false);
      } catch (error) {
        console.error("Error fetching bookings", error);
        setloading(false);
        seterror(true);
      }
    };

    fetchBookings();
  }, [user._id]);

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const result = await (
        await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(result);
      setloading(false);
      Swal.fire("Congrats", "Your booking has been Cancelled", "success").then(
        (r) => window.location.reload()
      );
    } catch (error) {
      console.log(error);
      seterror(true);
      setloading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs2">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>Booking id : </b>
                    {booking._id}
                  </p>
                  <p>
                    <b>CheckIn : </b>
                    {booking.fromdate}
                  </p>
                  <p>
                    <b>CheckOut : </b>
                    {booking.todate}
                  </p>
                  <p>
                    <b>Amount : </b>
                    {booking.totalamt}
                  </p>
                  <p>
                    <b>Status : </b>
                    {booking.status === "canceled" ? (
                      <Tag color="red">CANCELLED</Tag>
                    ) : (
                      <Tag color="green">CONFIRMED</Tag>
                    )}
                  </p>

                  {booking.status !== "canceled" && (
                    <div style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          cancelBooking(booking._id, booking.roomid)
                        }
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
