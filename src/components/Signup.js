import React, { useState } from 'react'
import { Link, useNavigate  } from "react-router-dom";


const Signup = (props) => {
  let Navigate  = useNavigate ();
    
  const [credentials, setCredentials] = useState({name: '', email: '', password: ''})
 
const handleSubmit= async(e)=>{
  e.preventDefault()
  const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      body: JSON.stringify({name: credentials.name, email: credentials.email, password : credentials.password }),
    });
    const json = await response.json()
    
    if(credentials.password !== credentials.cpassword){
      return props.showAlert('Password and Confirm password not match', "danger")
    }
     
  
    if(json.success){
          localStorage.setItem("token", json.token)
          props.showAlert('Account Created Sucessfully', "success")
          Navigate("/")
    } else{
      props.showAlert('Please Enter correct details', "danger")
    }
    console.log(json)
}
const onChange = (e)=>{
  setCredentials({...credentials, [e.target.name]: e.target.value})
} 
return (
  <div style={{width: "25rem", height: "33rem", marginTop:"5.5rem"}} className={`card card-header nav container`}>
    <h3 className='my-2'>Signup to Continiue iNotebook Journey!</h3>
    <form onSubmit={handleSubmit}>
<div className="mb-3">
  <label htmlFor="exampleInputEmail1" ><h5>Name</h5></label>
  <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp"  onChange={onChange} value={credentials.name} required minLength={5}/>
</div>
<div className="mb-1">
  <label htmlFor="exampleInputEmail1" ><h5>Email address</h5></label>
  <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"  onChange={onChange} value={credentials.email} required />
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-1">
  <label htmlFor="exampleInputPassword1" ><h5>Password</h5></label>
  <input type="password" className="form-control" name='password' id="password" onChange={onChange}  value={credentials.password} required minLength={5} />
</div>
<div className="mb-1">
  <label htmlFor="exampleInputPassword1" ><h5>Confirm Password</h5></label>
  <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange}  value={credentials.cpassword}/>
</div>
<div className='my-3'>
<Link  to="/Login">Already Registerd? Login Now!</Link></div>
<button type="submit" className="btn btn-primary">Singup</button>
</form>
  </div>
)
}

export default Signup
