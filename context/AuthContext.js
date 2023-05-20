import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);
export const API_URL = "https://story-api.dicoding.dev/v1";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("@user");
      if (value !== null) {
        // value previously stored
        setUser(JSON.parse(value));
        return value;
      }
    } catch (e) {
      // error reading value
      return null;
    }
  };

  useEffect(() => {
    void (async () => await getUser())();
  }, []);

  const login = async (email, password) => {
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setMessage("");
          setUser(data.loginResult);
          await AsyncStorage.setItem("@user", JSON.stringify(data.loginResult));
        } else {
          const data = await res.json();
          console.log(data);
          setMessage(data.message);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    setUser(null);
  };

  const value = {
    login,
    user,
    message,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
