import React from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";

export default function BlogCard(props) {
  const url = "/blog/" + props.data._id;
  return (
    <div className='col-sm-4'>
      <div className='card rounded-3 my-3 shadow mx-2'>
        <div className='card-body'>
          <Profile profile={props.data.owner} />
          <h3 className='mt-2 card-title fw-bold text-capitalize'>
            {props.data.title}
          </h3>
          <p className='card-text'>{props.data.description}</p>
          <Link to={url} className='btn btn-primary'>
            Read Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
