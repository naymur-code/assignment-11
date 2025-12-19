import { onAuthStateChanged } from "firebase/auth";
import React, { Children, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [userStatus,setUserStatus]=useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    axios.get(`http://localhost:5000/users/role/${user?.email}`).then((res) => {
      setRole(res.data.role);
      setUserStatus(res.data.status)
    });
  }, [user]);

  console.log(user, role);

  const authInfo = {
    name: "pranto",
    loading,
    user,
    setUser,
    setLoading,
    role,
    userStatus
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
