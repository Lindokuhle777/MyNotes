import React, { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null)
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currUser) => {
      if (user === null) {
        if (currUser === null) {
          setUser(currUser);
        } else {
          console.log(currUser.uid)
          setUser({ email: currUser.email, name: currUser.displayName,id:currUser.uid});
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
