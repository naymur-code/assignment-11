import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user, loading, userStatus } = useContext(AuthContext);

  console.log('private', user, userStatus);
  if (loading) {
    return <p className="text-yellow-300 text-center p-10">loading...</p>;
  }
  if (!user|| !userStatus=='active') {
    return <Navigate state={location.pathname} to="/login" />;
  }
  return children
};

export default PrivateRouter;
