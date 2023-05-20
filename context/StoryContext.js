import React, { createContext, useContext, useState } from "react";
import { API_URL } from "../constants";

const StoryContext = createContext({});

export const useStoryContext = () => useContext(StoryContext);

const StoryContextProvider = ({ children }) => {
  const [listStory, setListStory] = useState([]);

  const fetchStory = async (token) => {
    fetch(`${API_URL}/stories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setListStory(data.listStory);
        } else {
          const data = await res.json();
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const value = {
    fetchStory,
    listStory,
  };
  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
};

export default StoryContextProvider;
