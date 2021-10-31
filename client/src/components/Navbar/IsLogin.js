import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import dummyPro from "./../../images/profile.png";
import AuthContext from "../../store/Auth-context";
import { Link } from "react-router-dom";

export default function IsLogin() {
  const ctx = useContext(AuthContext);
  const imgData = "data:image/png;base64," + ctx.user.profile;

  return (
    <>
      <Link
        to='/createblog'
        className='me-4 text-light'
        style={{ textDecoration: "none" }}>
        Create Post
      </Link>
      <Button
        onClick={ctx.onLogout}
        className='me-4 text-light bg-transparent border-0'>
        Log Out
      </Button>
      <Link to='/'>
        {ctx.isLoggedIn ? (
          <img
            src={imgData}
            className='rounded-circle float-left'
            style={{ width: "35px", height: "35px" }}
            alt='profile'
          />
        ) : (
          <img
            src={dummyPro}
            className='rounded-circle float-left'
            style={{ width: "35px", height: "35px" }}
            alt='profile'
          />
        )}
      </Link>
    </>
  );
}

// /* <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
//       <Button className='btn btn-primary me-md-2' type='button'>
//         Create Post
//       </Button>
//       <Button className='btn btn-dark' type='button'>
//         Log Out
//       </Button>
//       <img
//         src={dummypro}
//         className='rounded-circle float-left'
//         style={{ width: "35px", height: "35px" }}
//         alt='profile image'
//       />
//     </div> */
