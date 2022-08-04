import React, { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
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
            .post("http://localhost:5000/NewUser/singleSignOn", {
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
    <AuthContext.Provider value={{ googleSignIn, user, logOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
