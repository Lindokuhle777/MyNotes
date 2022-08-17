import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../../MainContext";
import { HomeContext } from "./HomeContext";
import { uid } from "uid";
import { db } from "../../firebase";
import { set, ref, update, get } from "firebase/database";
import { Popper } from "@mui/material";
import Fade from "@mui/material/Fade";
import axios from "axios";

const mainDiv = {
  position: "fixed",
  width: "20%",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "#115571",
  paddingTop: "7%",
  textAlign: "center",
};

const btnSty = {
  backgroundColor: "white",
  color: "#31AFB4",
};

function Leftpanel() {
  const { user } = useContext(AuthContext);
  const {
    collections,
    setCollections,
    setCurrCollection,
    currCollection,
    getCollections,
    setIsLoading,
  } = useContext(HomeContext);
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const handleCurrCollection = (event) => {
    event.preventDefault();
  };

  const handleNewCollection = async (event) => {
    event.preventDefault();
    const temp = document.getElementById("collectionName").value;

    if (temp !== "") {
      const uuid = uid();
      await axios
        .post("/Collections/newCollection", {
          email: user.email,
          id: uuid,
          name: temp,
        })
        .then((res) => {
          getCollections();
        });
    }
    setOpen(false);
  };
  return (
    <div style={mainDiv}>
      <Typography variant="h4" style={{ color: "white" }}>
        Collections
      </Typography>
      <Button
        size="large"
        variant="filled"
        style={btnSty}
        onClick={handleClick}
      >
        New Collection
      </Button>
      <div>
        <List
          dense={true}
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            margin: "10% 5%",
            borderRadius: "10px",
          }}
        >
          {collections.map((item, index) => (
            <div key={item.id+"leftPanel"}>
              
              <ListItem
                onClick={(event) => {
                  event.preventDefault();
                  setCurrCollection(item);
                  setIsLoading(true);
                }}
                button
                style={{
                  backgroundColor:
                    currCollection.id !== item.id
                      ? "white"
                      : "rgba(49, 175, 180,0.1)",
                  borderRadius: "10px",
                  marginBottom: "5px",
                  color: currCollection.id !== item.id ? "black" : "white",
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </ListItem>
            </div>
          ))}
        </List>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              style={{ padding: "10px", display: "flex", flexDirection: "row" }}
            >
              <TextField
                variant="standard"
                placeholder="Collection Name"
                id="collectionName"
                size="small"
              />
              <Button size="small" onClick={handleNewCollection}>
                Save
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default Leftpanel;
