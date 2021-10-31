import React, { useRef, useContext } from "react";
import { Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import AuthContext from "../../store/Auth-context";

//name email pass img
export default function Login() {
  const ctx = useContext(AuthContext);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const imgData = new FormData();
    imgData.append("profile", event.target[3].files[0]);

    fetch("http://127.0.0.1:5000/user", {
      method: "POST",
      body: JSON.stringify({
        name: nameInputRef.current.value,
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
        fetch("http://127.0.0.1:5000/user/profile", {
          method: "POST",
          body: imgData,
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }).then((res) => {
          if (res.ok) {
            ctx.onLogin(data.token, data.user);
          }
        });
      });
  };

  if (ctx.isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
          <div className='login-form bg-light mt-4 p-4'>
            <form onSubmit={submitHandler} className='row g-3'>
              <h4>Sign Up</h4>
              <div className='col-12'>
                <label>Name</label>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  placeholder='Shingala Tirth'
                  ref={nameInputRef}
                />
              </div>
              <div className='col-12'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
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
                <label>Profile Pic</label>
                <input type='file' name='profile' className='form-control' />
              </div>

              <div className='col-12'>
                <Button type='submit' className='btn btn-dark'>
                  Sign Up
                </Button>
              </div>
            </form>
            <hr className='mt-4' />
            <div className='col-12'>
              <p className='text-center mb-0'>
                Already have account? <Link to='/login'>LogIn</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
