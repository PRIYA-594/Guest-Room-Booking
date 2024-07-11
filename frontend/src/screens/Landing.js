import React from 'react'
import {Link} from 'react-router-dom'
function Landing() {
  return (
    <div className='row landing'>
        <div className='col-md-12' style={{textAlign:'center', marginTop:'60px'}}>
            <h1 style={{color:'white',fontSize:'60px'}}>GUEST ROOM BOOKING</h1>
            <h2 style={{color:'white'}}>Book your rooms</h2>
            <Link to='/home'>
            <button className='btn btn-primary' style={{borderColor:'gold'}}>Book Rooms</button>
            </Link>
        </div>
    </div>
  )
}

export default Landing