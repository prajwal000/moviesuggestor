import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const [userData, setUserData] = useState();
  const history = useHistory();
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accesstoken");
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured");
      }
    }
  };

  if (!localStorage.getItem("accesstoken")) {
    alert("you need to login to access this page");
    history.replace("/");
  }

  const logOut = () => {
    localStorage.removeItem("accesstoken");
    history.replace("/");
  };
  return (
    <>
      <Link to="/">Home</Link>
      <br />
      Name: {userData.name}
      <br />
      email:{userData.email}
      <br />
      country:{userData.country}
      <br />
      <button onClick={logOut}> Log Out</button>
    </>
  );
};
export default Profile;
