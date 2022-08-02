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
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut =async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currUser) => {
      setUser({ email: currUser.email, name: currUser.displayName });
      console.log({ email: currUser.email, name: currUser.displayName });
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

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
