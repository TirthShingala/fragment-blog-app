import React from "react";
import { Link } from "react-router-dom";

export default function NotLogin() {
  return (
    <>
      <Link
        to='/signup'
        className='me-4 text-light'
        style={{ textDecoration: "none" }}>
        Create Account
      </Link>
      <Link
        to='/login'
        className='me-4 text-light'
        style={{ textDecoration: "none" }}>
        LogIn
      </Link>
    </>
  );
}
