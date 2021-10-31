import React, { useRef, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import AuthContext from "../../store/Auth-context";

export default function CreateBlog() {
  const ctx = useContext(AuthContext);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const blogRef = useRef();

  const [uploaded, setUploaded] = useState(false);
  const [id, setId] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    // const imgData = new FormData();
    // imgData.append("cover", event.target[1].files[0]);

    fetch("http://127.0.0.1:5000/blog", {
      method: "POST",
      body: JSON.stringify({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        blog: blogRef.current.value,
      }),
      headers: {
        Authorization: "Bearer " + ctx.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        // imgData.append("id", data._id);
        setId(data._id);
        setUploaded(true);
      });
  };

  if (!ctx.isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (uploaded) {
    const url = "/blog/" + id;
    return <Redirect to={url} />;
  }

  return (
    <form className='container mt-3' onSubmit={submitHandler}>
      <div className='mb-3'>
        <label htmlFor='discription' className='form-label'>
          Blog title
        </label>
        <input
          type='text'
          className='form-control'
          id='discription'
          ref={titleRef}
          required
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='discription' className='form-label'>
          Small Description About Blog
        </label>
        <input
          type='text'
          className='form-control'
          id='discription'
          ref={descriptionRef}
          required
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='exampleFormControlTextarea1' className='form-label'>
          Blog
        </label>
        <textarea
          className='form-control'
          rows='10'
          ref={blogRef}
          required></textarea>
      </div>

      <Button type='submit' className='btn btn-primary'>
        Submit
      </Button>
    </form>
  );
}
