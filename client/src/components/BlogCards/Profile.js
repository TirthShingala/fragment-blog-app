import React from "react";
import DefaultP from "../../images/profile.png";

export default function Profile(props) {
  // const [profile, setProfile] = useState(DP);
  const data = "data:image/png;base64," + props.profile.profile;

  // useEffect(() => {
  //   const url = "http://127.0.0.1:5000/profile?id=" + props.profile._id;
  //   if (props.profile._id === "617044ff701d4a6d0155ec73") {
  //     fetch(url)
  //       .then((res) => {
  //         console.log("here");
  //         console.log(res);
  //         // return res.blob();
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log("data");
  //         console.log(data);
  //         // const image = "data:image/png;base64," + data;
  //         const image = data;
  //         setProfile(image);
  //       });
  //   }
  // }, [props]);

  return (
    <>
      {props.profile.profile ? (
        <img
          src={data}
          className='rounded-circle float-left border border-2 border-dark'
          style={{ width: "50px" }}
          alt='profile'
        />
      ) : (
        <img
          src={DefaultP}
          className='rounded-circle float-left'
          style={{ width: "50px" }}
          alt='profile'
        />
      )}
      <h4 className='float-right d-inline text-capitalize ms-2'>
        {props.profile.name}
      </h4>
    </>
  );
}
