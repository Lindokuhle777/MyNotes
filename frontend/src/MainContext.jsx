import React, {createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Main Context
//handles google single sign on and provides the user to thr rest of the app

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const desktop = useMediaQuery('(min-width:600px)');

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    desktop ? signInWithPopup(auth, provider):signInWithRedirect(auth, provider);
  };

  const logOut = async () => {
    await signOut(auth);
    const localStorage = window.localStorage;
    localStorage.getItem("user") !== null && localStorage.removeItem("MyNotesUser");
    setUser(null);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async(currUser) => {
      const tempUser = window.localStorage.getItem("MyNotesUser");
     
        if (currUser) {
          const data = {
            email: currUser.email,
            name: currUser.displayName,
            id: currUser.uid,
          };
          setUser(data);
          await axios
            .post("/NewUser/singleSignOn", data);
          navigate("/Home");
        } else if (tempUser) {
          const temp = JSON.parse(tempUser);
          setUser(temp);
          navigate("/Home");
         
        }
        else {
          
          setUser(null);
        }
      
    });
    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, user, logOut, setUser,desktop }}>
      {children}
    </AuthContext.Provider>
  );
};
