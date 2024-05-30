import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword:"" });
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account created  successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    
    <div className="container mt-3">
    <h1>Create an account to continue to Inotebook</h1>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} minLength={5} required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onChange} minLength={5} required aria-describedby="email" />
          <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup;
