import React, { useContext, useState, useParams, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import AuthContext from "../../store/Auth-context";

export default function CreateBlog() {
  const ctx = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blog, setBlog] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const { uId } = useParams();

  useEffect(() => {
    const url = "http://127.0.0.1:5000/blog?id=" + uId;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setBlog(data.blog);
      });
  }, [uId]);

  const updateBlog = () => {
    const uurl = "http://127.0.0.1:5000/blog/" + uId;
    fetch(uurl, {
      method: "PATCH",
      body: JSON.stringify({
        title: title,
        description: description,
        blog: blog,
      }),
      headers: {
        Authorization: "Bearer " + ctx.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setUploaded(true);
      }
    });
  };

  if (!ctx.isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (uploaded) {
    const url = "/blog/" + uId;
    return <Redirect to={url} />;
  }

  return (
    <form className='container mt-3' onSubmit={updateBlog}>
      <div className='mb-3'>
        <label htmlFor='discription' className='form-label'>
          Blog title
        </label>
        <input
          type='text'
          className='form-control'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          value={blog}
          onChange={(e) => setBlog(e.target.value)}
          required></textarea>
      </div>

      <Button type='submit' className='btn btn-secondary'>
        Submit
      </Button>
    </form>
  );
}
