import React, { useRef, useContext } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../../store/Auth-context";
import { Redirect, Link } from "react-router-dom";

export default function Login() {
  const ctx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        ctx.onLogin(data.token, data.user);
      });
  };

  if (ctx.isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
          <div className='login-form bg-light mt-4 p-4'>
            <form onSubmit={submitHandler} className='row g-3'>
              <h4>Welcome Back</h4>
              <div className='col-12'>
                <label>Email</label>
                <input
                  type='email'
                  name='username'
                  className='form-control'
                  placeholder='example@example.com'
                  ref={emailInputRef}
                />
              </div>
              <div className='col-12'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  placeholder='Password'
                  ref={passwordInputRef}
                />
              </div>

              <div className='col-12'>
                <Button type='submit' className='btn btn-dark '>
                  Login
                </Button>
              </div>
            </form>
            <hr className='mt-4' />
            <div className='col-12'>
              <p className='text-center mb-0'>
                Have not account yet? <Link to='/signup'>Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
