import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password === cpassword) {//check if password and confirm password are same
      const user = {
        name,
        email,
        phone,
        password,
      };
      try {
        setloading(true);
        const result = (await axios.post("/api/users/register", user)).data;
        setloading(false);
        setsuccess(true);

        setname("");
        setemail("");
        setphone("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
      alert("Passwords not matched");
    }
  }
  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registeration success" />}
          <div className="bs1">
            <div className="reg">
              <h1>Register</h1>
              <input
                type="name"
                className="form-control"
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
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
                type="tel"
                className="form-control"
                placeholder="mobile number"
                value={phone}
                onChange={(e) => {
                  setphone(e.target.value);
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
              <input
                type="password"
                className="form-control"
                placeholder="confirm password"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
              <button className="btn btn-primary mt-4" onClick={register}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
