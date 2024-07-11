import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "./../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';
import { useParams, useNavigate,Link } from "react-router-dom";

const items = [
  { key: "1", label: "Bookings", children: <Bookings /> },
  { key: "2", label: "Rooms", children: <Rooms /> },
  { key: "3", label: "Add Room", children: <Addroom /> },
  { key: "4", label: "Update & Delete Room", children: <UpdateDeleteRoom /> },
  { key: "5", label: "Users", children: <Users /> },
];

// ADMIN PANEL
function Admin() {

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser?.isHouseOwner) {
          window.location.href = '/home';
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div>
      <div className="mt-3 ml-3 mr-3 bs3">
        <h2 className="text-center" style={{ fontSize: "30px" }}>
          <b>Admin Panel</b>
        </h2>
        <Tabs
          defaultActiveKey="1"
          items={items}
          indicator={{ size: (origin) => origin - 20, align: "center" }}
        />
      </div>
    </div>
  );
}

export default Admin;


// BOOKING DETAILS
export function Bookings() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const roomResponse = await axios.get("/api/rooms/getallRooms");
        setRooms(roomResponse.data);
        const bookingsResponse = await axios.get("/api/bookings/getallbookings");
        setBookings(bookingsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        {error && <Error />}
        
        <table className="table table-bordered table-dark">
          <thead className="bs1">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 && bookings.map(booking => {
              const room = rooms.find(room => room._id === booking.roomid);
              if (room && room.ownerid === user._id) {
                return (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{room.name}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>

        
      </div>
    </div>
  );
}

//ROOM DETAILS
export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/getallRooms");
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}
        {error && <Error />}
        
        <table className="table table-bordered table-dark">
          <thead className="bs1">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Square feet</th>
              <th>Min Book</th>
              <th>Max Book</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 && rooms.map(room => {
              if (room.ownerid === user._id) {
                return (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentPerDay}</td>
                    <td>{room.squarefeet}</td>
                    <td>{room.minimumBook}</td>
                    <td>{room.maximumBook}</td>
                    <td>{room.phone}</td>
                    <td>{room.address}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>

        
      </div>
    </div>
  );
}


//USER DETAILS
export function Users() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const cuser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const roomResponse = await axios.get("/api/rooms/getallRooms");
        setRooms(roomResponse.data);
        const bookingsResponse = await axios.get("/api/bookings/getallbookings");
        setBookings(bookingsResponse.data);
        const usersResponse = await axios.get("/api/users/getallusers");
        setUsers(usersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        {error && <Error />}
        
        <table className="table table-dark table-bordered">
          <thead className="bs1">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th> 
              <th>isOwner</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 && users.map(user => {
              
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.isHouseOwner ? 'YES' : 'NO'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//ADDING ROOM
export function Addroom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [rentPerDay, setRentPerDay] = useState('');
  const [squarefeet, setSquareFeet] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [minimumBook, setMinBook] = useState('');
  const [maximumBook, setMaxBook] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const ownerid = JSON.parse(localStorage.getItem('currentUser'))._id;

  async function addRoom() {
    const newRoom = {
      name,
      ownerid,
      squarefeet,
      minimumBook,
      maximumBook,
      rentPerDay,
      type,
      description,
      phone,
      address,
      imageUrls: [imageUrl1, imageUrl2, imageUrl3],
      currentBookings: []
    };

    try {
      setLoading(true);
      const result = await axios.post('/api/rooms/addroom', newRoom);
      console.log(result.data);
      setLoading(false);
      Swal.fire('Congrats', 'Your New Room Added Successfully', 'success').then(() => {
        window.location.href = '/home';
      });
    } catch (error) {
      console.error("Error adding room:", error);
      setLoading(false);
      setError(true);
      Swal.fire('Oops', 'Something went wrong', 'error');
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader />}
        {error && <Error />}
        <input type="text" className="form-control" placeholder="Room name"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" className="form-control" placeholder="Rent per day"
          value={rentPerDay} onChange={(e) => setRentPerDay(e.target.value)} />
        <input type="text" className="form-control" placeholder="Square feet"
          value={squarefeet} onChange={(e) => setSquareFeet(e.target.value)} />
        <input type="text" className="form-control" placeholder="Description"
          value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" className="form-control" placeholder="Phone number"
          value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="text" className="form-control" placeholder="Address"
          value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="col-md-5">
        <input type="text" className="form-control" placeholder="Type"
          value={type} onChange={(e) => setType(e.target.value)} />
        <input type="text" className="form-control" placeholder="Minimum booking"
          value={minimumBook} onChange={(e) => setMinBook(e.target.value)} />
        <input type="text" className="form-control" placeholder="Maximum booking"
          value={maximumBook} onChange={(e) => setMaxBook(e.target.value)} />
        <input type="text" className="form-control" placeholder="Image URL 1"
          value={imageUrl1} onChange={(e) => setImageUrl1(e.target.value)} />
        <input type="text" className="form-control" placeholder="Image URL 2"
          value={imageUrl2} onChange={(e) => setImageUrl2(e.target.value)} />
        <input type="text" className="form-control" placeholder="Image URL 3"
          value={imageUrl3} onChange={(e) => setImageUrl3(e.target.value)} />
        <div style={{ textAlign: 'right' }}>
          <button className="btn btn-primary mt-2" onClick={addRoom}>ADD ROOM</button>
        </div>
      </div>
    </div>
  );
}

// UPDATE AND DELETE ROOMS
export function UpdateDeleteRoom() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoadingRooms(true);
        const response = await axios.get('/api/rooms/getallrooms');
        setRooms(response.data);
        setLoadingRooms(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError(true);
        setLoadingRooms(false);
      }
    };

    fetchRooms();
  }, []);

  const fetchRoom = async (roomId) => {
    try {
      setLoadingUpdate(true);
      const response = await axios.get(`/api/rooms/${roomId}`);
      setSelectedRoom(response.data);
      setLoadingUpdate(false);
    } catch (error) {
      console.error('Error fetching room data:', error);
      setError(true);
      setLoadingUpdate(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRoom(prevRoom => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoadingUpdate(true);
      await axios.put(`/api/rooms/updateroom/${selectedRoom._id}`, {
        rentPerDay: selectedRoom.rentPerDay,
        minimumBook: selectedRoom.minimumBook,
        maximumBook: selectedRoom.maximumBook,
      });
      Swal.fire('Success', 'Room updated successfully', 'success').then(() =>
        navigate('/admin')
      );
    } catch (error) {
      console.error('Error updating room:', error);
      Swal.fire('Error', 'Failed to update room', 'error');
    } finally {
      setLoadingUpdate(false);
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      setLoadingDelete(true);
      await axios.delete(`/api/rooms/deleteroom/${roomId}`);
      Swal.fire('Success', 'Room deleted successfully', 'success').then(() =>
        window.location.reload()
      );
    } catch (error) {
      console.error('Error deleting room:', error);
      Swal.fire('Error', 'Failed to delete room', 'error');
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div>
      {(loadingRooms || loadingUpdate || loadingDelete) && <Loader />}
      {error && <Error />}
      <div className="container">
        <h2>Admin Panel</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              room.ownerid === user._id && (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td className="btn-des">
                    <button className="btn btn-primary" onClick={() => fetchRoom(room._id)}>Update</button>
                    <button className="btn btn-primary" onClick={() => deleteRoom(room._id)}>Delete</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>

        {/* Update Room Form */}
        {selectedRoom && (
          <div>
            <h2>Update Room</h2>
            <form>
              <div className="form-group">
                <label>Rent</label>
                <input
                  type="number"
                  name="rentPerDay"
                  value={selectedRoom.rentPerDay}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Min Book</label>
                <input
                  type="number"
                  name="minimumBook"
                  value={selectedRoom.minimumBook}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Max Book</label>
                <input
                  type="number"
                  name="maximumBook"
                  value={selectedRoom.maximumBook}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update Room
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}