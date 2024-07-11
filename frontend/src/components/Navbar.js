import React from "react";
import Home from './../screens/Home';

function Navbar() {
  let user = null;
  const userString = localStorage.getItem("currentUser");

  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    console.log("No current user found in localStorage");
  }

  function logout(){
    localStorage.removeItem('currentUser')
    window.location.href='/login';
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/home">
          GUEST_ROOM_BOOKING
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" ><i class="fa fa-bars" style={{color:'gold'}}></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav rightnav">
            {user ? (
              <>
                <div class="dropdown">
                  <button
                    style={{paddingRight:'20px',marginRight:'5px'}}
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                  <i class="fa fa-user" style={{color:'gold'}}></i> {user.name}
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="\profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    
    </div>
  
  );
  
}

export default Navbar;
