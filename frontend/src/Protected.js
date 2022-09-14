import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./MainContext";

//If the used if null then navigate to the login page

function Protected({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default Protected;
