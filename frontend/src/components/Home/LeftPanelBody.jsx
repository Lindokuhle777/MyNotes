import { Badge, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../../MainContext";
import { HomeContext } from "./HomeContext";
import { uid } from "uid";
import { Popper } from "@mui/material";
import Fade from "@mui/material/Fade";
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";

const btnSty = {
    backgroundColor: "white",
    color: "#31AFB4",
  };

function LeftPanelBody() {
const { user } = useContext(AuthContext);
  const {
    collections,
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


  const closePopper =()=>{
    setOpen(false);

  }

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
         <Typography variant="h4" style={{ color: "white",margin:"7% 0" }}>
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

      <List
        dense={true}
        style={{
          height: "80vh",
          overflow: "auto",
          padding: "0 5px",
          marginTop: "7%",
          
        }}
      >
        {collections.map((item, index) => (
          <div key={item.id + "leftPanel"}>

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

      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Badge badgeContent={<IconButton onClick={closePopper}><ClearIcon  style={{ color: "red"}}/></IconButton>}><Paper
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
            </Paper></Badge>

          </Fade>
        )}
      </Popper>

    </div>
  )
}

export default LeftPanelBody