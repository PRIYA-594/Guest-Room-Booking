import React,{useState,useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AdminAccessRequest() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [key,setkey] = useState('');
 // const secretKey ="MERN4532";

  const requestAdminAccess = async () => {
    // if(key===secretKey)
    // {
        try {
            const response = await axios.post("/api/users/requestAdminAccess", { userId: user._id });
            Swal.fire("Success", response.data.message, "success");
            window.location.reload('/profile');
          } catch (error) {
            console.error("Error requesting admin access:", error);
            Swal.fire("Error", "Failed to request admin access", "error");
          }
   // }
    
  };
/*<input type="password" className="form-control" placeholder="Enter Access Key" 
      value={key} onChange={(e)=>setkey(e.target.value)}/>*/
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Request Admin Access</h1>
      
      <button className="btn btn-primary" onClick={requestAdminAccess}>
        Request Access
      </button>
    </div>
  );
}

export default AdminAccessRequest;
