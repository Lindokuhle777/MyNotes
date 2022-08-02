import React, { useContext } from "react";
import { LoginContext } from "./LoginContext";

const mainDiv = {
    position:"absolute",
    width:"60%",
    left:0,
    right:0,
    top:0,
    bottom:0,
    backgroundColor:"#115571"
}

const imgStyle = {
  position:"absolute",
    left:0,
    right:0,
    top:0,
    bottom:0,
    margin:"auto"

}

function LeftPanel() {
  const { user } = useContext(LoginContext);
  return <div style={mainDiv}>
    <img style={imgStyle}
    src="logo.jpg"
    />
  </div>;
}
export default LeftPanel;
