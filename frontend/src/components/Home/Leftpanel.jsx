import React from 'react';
import LeftPanelBody from './LeftPanelBody';

const mainDiv = {
  position: "fixed",
  width: "20%",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "#115571",
  textAlign: "center",
  paddingBottom: "5%"
};



function Leftpanel() {
  
  return (
    <div style={mainDiv}>
      <LeftPanelBody/>
    </div>
  );
}

export default Leftpanel;
