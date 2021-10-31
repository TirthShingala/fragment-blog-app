import React from "react";

export default function Error() {
  return (
    <div
      className='d-flex justify-content-center align-items-center mt-3'
      style={{ height: "80vh" }}>
      <h1 className='align-top'>400</h1>
      <div className='inline-block'>
        <h2 className='font-weight-normal lead'>Somthing went wrong!</h2>
      </div>
    </div>
  );
}
