import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Profile from "../BlogCards/Profile";
import { Redirect } from "react-router";
import Loading from "../Loading";
import AuthContext from "../../store/Auth-context";

export default function BlogByID() {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState({});
  const [Load, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [update, setUpdate] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const url = "http://127.0.0.1:5000/blog?id=" + id;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (ctx.user._id === data.owner._id) {
          setIsOwner(true);
        }
        setData(data);
        setLoading(false);
      });
  }, [id, ctx.user._id]);

  const deleteBlog = () => {
    const durl = "http://127.0.0.1:5000/blog/" + id;
    fetch(durl, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ctx.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setDeleted(true);
      }
    });
  };

  const updateBlog = () => {
    setUpdate(true);
  };

  if (update) {
    const uurl = "/update/" + id;
    return <Redirect to={uurl} />;
  }

  if (Load) {
    return <Loading />;
  }

  if (deleted) {
    return <Redirect to='/' />;
  }

  return (
    <div className='mt-3 container bg-light'>
      <Profile profile={data.owner} />
      <h1 className='text-capitalize my-2'>{data.title}</h1>
      <p>{data.description}</p>
      <p>{data.blog}</p>
      {isOwner && (
        <button
          type='button'
          onClick={deleteBlog}
          className='btn btn-danger m-3'>
          Delete
        </button>
      )}
      {isOwner && (
        <button
          type='button'
          onClick={updateBlog}
          className='btn btn-secondary m3'>
          Update
        </button>
      )}
    </div>
  );
}
