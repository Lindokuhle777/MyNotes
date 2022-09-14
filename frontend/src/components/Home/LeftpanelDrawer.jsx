import React from "react";
import Drawer from "@mui/material/Drawer";
import { HomeContext } from "./HomeContext";
import LeftPanelBody from "./LeftPanelBody";

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

export default function LeftPanelDrawer() {
  const {
    openDrawer,
    handleCloseDrawer,
  } = React.useContext(HomeContext);
  const anchor = "left";


  return (
    <div>
      <React.Fragment>
        <Drawer anchor={anchor} open={openDrawer} onClose={handleCloseDrawer}>
          <div style={mainDiv}>
            <LeftPanelBody/>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
