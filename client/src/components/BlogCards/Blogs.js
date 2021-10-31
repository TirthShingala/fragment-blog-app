import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Loading from "../Loading";
import Error from "../Error";

export default function Blogs() {
  const [BlogsData, setBlogsData] = useState([]);
  const [Load, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/blogs", {
          headers: {
            Accept: "application/json",
          },
        });
        const Blogs = await res.json();
        setBlogsData(Blogs);
        setLoading(false);
      } catch (e) {
        setError(true);
      }
    };
    getBlogs();
  }, []);

  if (Load) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='mt-3 container bg-light'>
      <div className='row'>
        {BlogsData.map((blog) => {
          return <BlogCard data={blog} key={blog._id} />;
        })}
      </div>
    </div>
  );
}
