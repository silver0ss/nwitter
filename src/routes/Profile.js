import { getAuth } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClik = () => {
    const auth = getAuth();
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClik}>Log Out</button>
    </>
  );
};
export default Profile;
