import React, { useContext, useState } from "react";
import LeftPanel from "./LeftPanel";
import { LoginContext } from "./LoginContext";
import RightPanel from "./RightPanel";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from "../../MainContext";

function Login() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const {desktop} = useContext(AuthContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <LoginContext.Provider value={{handleClose, setOpen, setMessage }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {desktop && <LeftPanel />}
        <RightPanel />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        />
      </div>
    </LoginContext.Provider>
  );
}

export default Login;
