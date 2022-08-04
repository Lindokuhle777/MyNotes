import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { AuthContext } from "../../MainContext";
import Rightpanel from "./Rightpanel";
import Leftpanel from "./Leftpanel";
import { HomeContext } from "./HomeContext";
import axios from "axios";

function HomePage() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [currCollection, setCurrCollection] = React.useState(null);
  const [collections, setCollections] = React.useState([]);

  const { logOut, setUser, user } = useContext(AuthContext);

  const handleClose = () => {
    setOpenMenu(false);
  };

  const getCollections = async () => {
    
    await axios
      .post("http://localhost:5000/Collections/getCollections", {
        email: user.email,
      })
      .then((res) => {
        const temp = res.data;
        setCollections(temp);
        temp.length>0 && setCurrCollection(temp[temp.length-1]);
        
      });
  };

  useEffect(() => {
    getCollections();
  },[])

  

  const handleClickOpen = () => {
    setOpenMenu(true);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <HomeContext.Provider
        value={{
          currCollection,
          setCurrCollection,
          collections,
          setCollections,
          getCollections
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" style={{ backgroundColor: "#115571" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {user.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClickOpen}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMenu}
                onClose={handleClose}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
        <Leftpanel />
        <Rightpanel />
      </HomeContext.Provider>
    </div>
  );
}

export default HomePage;
