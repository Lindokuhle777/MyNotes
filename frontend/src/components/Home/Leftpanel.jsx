import { Button, Divider, Typography } from "@mui/material";
import React from "react";
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
  return (
    <div style={mainDiv}>
      <Typography variant="h4" style={{ color: "white" }}>
        Collections
      </Typography>
      <Button size="large" variant="filled" style={btnSty}>
        New Collection
      </Button>
      <div>
        <List
          dense={true}
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            margin: "10% 5%",
            borderRadius: "10px"
          }}
        >
          {[
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "eleven",
          ].map((item, index) => (
            <div>
              <ListItem
                key={item}
                button
                style={{ backgroundColor: "white",borderRadius: "10px",marginBottom: "5px"}}
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
                <ListItemText primary={item} secondary={item} />
              </ListItem>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Leftpanel;
