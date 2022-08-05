import React,{ useContext} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { Popper } from "@mui/material";
import Fade from "@mui/material/Fade";
import { uid } from "uid";
import { Paper, TextField, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {HomeContext} from "./HomeContext";
import { AuthContext } from "../../MainContext";
import axios from "axios";

const mainDiv = {
  position: "fixed",
  width: "80%",
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

export default function TemporaryDrawer() {
  const {openDrawer,handleCloseDrawer,collections, setCollections, setCurrCollection,getCollections} = React.useContext(HomeContext);
  const { user } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const anchor = "left";

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
    <div>
      <React.Fragment>
        <Drawer
          anchor={anchor}
          open={openDrawer}
          onClose={handleCloseDrawer}
        >
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
            <div key={item.uuid}>
              <ListItem
                onClick={(event) => {
                  event.preventDefault();
                  setCurrCollection(item);
                }}
                button
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  marginBottom: "5px",
                }}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
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
        </Drawer>
      </React.Fragment>
    </div>
  );
}
