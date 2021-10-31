import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "../BlogCards/Profile";
import Loading from "../Loading";

export default function BlogByID() {
  const [data, setData] = useState({});
  const [Load, setLoading] = useState(true);

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
        setData(data);
        setLoading(false);
      });
  }, [id]);

  if (Load) {
    return <Loading />;
  }

  return (
    <div className='mt-3 container bg-light'>
      <Profile profile={data.owner} />
      <h1 className='text-capitalize my-2'>{data.title}</h1>
      <p>{data.description}</p>
      <p>{data.blog}</p>
    </div>
  );
}
