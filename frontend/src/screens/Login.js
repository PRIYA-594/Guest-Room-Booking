import React, { useState, useEffect } from "react";
import  axios  from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(); 

  async function login() {
    const user = {
      email,
      password,
    };
    try{
      setloading(true);
      const result = (await axios.post('/api/users/login',user)).data;
      setloading(false);

      localStorage.setItem('currentUser',JSON.stringify(result));//set current user to local storage
      
      window.location.href='/home';

    }catch(error){
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }
  return (
    <div>
      {loading && (<Loader/>)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && (<Error message="Invalid credentials" />)}
          <div className="bs1">
            <div className="reg">
              <h1>Login</h1>
              <input
                type="email"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />

              <button className="btn btn-primary mt-4" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;