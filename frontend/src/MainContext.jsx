import React, { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const desktop = useMediaQuery('(min-width:600px)');

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    desktop ? signInWithPopup(auth, provider):signInWithRedirect(auth, provider);
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currUser) => {
      if (user === null) {
        if (currUser === null) {
          setUser(currUser);
        } else {
          setUser({
            email: currUser.email,
            name: currUser.displayName,
            id: currUser.uid,
          });
          axios
            .post("/NewUser/singleSignOn", {
              email: currUser.email,
              name: currUser.displayName,
              id: currUser.uid,
            })
            .then((res) => {
             
            });
        }
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
