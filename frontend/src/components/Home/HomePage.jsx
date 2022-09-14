import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../MainContext";
import Rightpanel from "./Rightpanel";
import Leftpanel from "./Leftpanel";
import { HomeContext } from "./HomeContext";
import axios from "axios";
import LeftpanelDrawer from "./LeftpanelDrawer";

function HomePage() {
  const [currCollection, setCurrCollection] = React.useState(null);
  const [collections, setCollections] = React.useState([]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [isLoading,setIsLoading] = React.useState(false);
  const { user, desktop } = useContext(AuthContext);

  const getCollections = async () => {
    await axios
      .post("/Collections/getCollections", {
        email: user.email,
      })
      .then((res) => {
        const temp = res.data;
        setCollections(temp);
        temp.length > 0 && setCurrCollection(temp[temp.length - 1]);
      });
  };

  useEffect(() => {
    getCollections();
  },[]);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer= () => {
    setOpenDrawer(true);
  }

  return (
    <div>
      <HomeContext.Provider
        value={{
          currCollection,
          setCurrCollection,
          handleOpenDrawer,
          collections,
          setCollections,
          getCollections,
          openDrawer,
          handleCloseDrawer,
          isLoading,
          setIsLoading
        }}
      >
        
        {desktop ? <Leftpanel /> : <LeftpanelDrawer />}
        <Rightpanel />
      </HomeContext.Provider>
    </div>
  );
}

export default HomePage;
