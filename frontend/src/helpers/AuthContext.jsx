// src/helpers/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/auth/auth`, {
          headers: { accessToken: token },
        })
        .then((response) => {
          if (response.data.error) {
            setAuthState({
              username: "",
              id: 0,
              status: false,
            });
          } else {
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching auth status:", error);
          setAuthState({
            username: "",
            id: 0,
            status: false,
          });
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
