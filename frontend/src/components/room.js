import React, { useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
function MyVerticallyCenteredModal({ show, onHide, room }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {room.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel>
          {room.imageUrls.map((img) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100 bigimg"
                  src={img}
                  alt="image-rooms"
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
        <p>{room.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Room({ room, fromdate, todate }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="row bs">
      <div className="col-md-7">
        <h1 className="Name">{room.name}</h1>
        <b>
          <p>Square feet: {room.squareFeet}</p>
          <p>Rent Per Day: {room.rentPerDay}</p>
          <p>Type: {room.type}</p>
          <p>
            No of Booking Min: {room.minimumBook} Max: {room.maximumBook}
          </p>
          <p>Phone Number: {room.phone_number}</p>
          <p>Address: {room.address}</p>
        </b>
        <div style={{ float: "right" }}>
          {fromdate && todate && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary m-2" variant="primary">
                Book Now
              </button>
            </Link>
          )}

          <button
            className="btn btn-primary"
            variant="primary"
            onClick={() => setModalShow(true)}
          >
            View Details
          </button>
        </div>
      </div>
      <div className="col-md-5">
        <img src={room.imageUrls[0]} className="smallimg" alt={room.name} />
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        room={room}
      />
    </div>
  );
}

export default Room;
