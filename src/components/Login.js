import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, Route, useNavigate  } from "react-router-dom";
import Home from './Home';


const Login = (props) => {

    let Navigate  = useNavigate ();

    const [credentials, setCredentials] = useState({ email: '', password: ''})
   
const handleSubmit= async(e)=>{
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify({ email: credentials.email, password : credentials.password }),
      });
      const json = await response.json()
      if(json.success){
            localStorage.setItem("token", json.token)
            Navigate('/')
            props.showAlert('Logined Sucessfully', "success")
      } else{
        props.showAlert('Invalid Credentials', "danger")
      }
      console.log(json)
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  } 
  return (
    <div style={{width: "25rem", height: "27rem", marginTop:"6rem"}} className={`card card-header nav container`}>
      <h2 className='my-2'>Login to Continiue iNotebook Journey!</h2>
      <form style={{marginTop: "1rem"}} onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label"><h4>Email address</h4></label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"  onChange={onChange} value={credentials.email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label"><h4>Password</h4></label>
    <input type="password" className="form-control" name='password' id="password" onChange={onChange}  value={credentials.password}/>
  </div>
  <div className='my-3'>
<Link  to="/Signup">New User? Click here to Signup Now</Link></div>
  <button  type="submit" className="btn btn-primary">Login</button>
  
</form>
    </div>
  )
}

export default Login
