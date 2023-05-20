import React, { useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  Button,
} from "react-native";
import { useStoryContext } from "../../context/StoryContext";
import { useSelector, useDispatch } from "react-redux";
import { getAuthUser } from "../../redux/auth/authSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetUser, setUser } from "../../redux/auth/authSlice";

const Item = ({ name, description, photoUrl }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.description}>{description}</Text>
    <Image
      style={styles.image}
      source={{
        uri: photoUrl,
      }}
    />
  </View>
);

const HomeScreen = ({ navigation }) => {
  const { listStory, fetchStory } = useStoryContext();

  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("@user");
      if (value !== null) {
        dispatch(setUser(JSON.parse(value)));
        return value;
      }
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    void (async () => await getUser())();
  }, []);

  const userRedux = useSelector(getAuthUser);
  useEffect(() => {
    if (userRedux.userToken === "") {
      navigation.replace("Login");
    } else {
      void (async () => {
        await fetchStory(userRedux.userToken);
      })();
    }
  }, [userRedux]);

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    dispatch(resetUser());
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
        }}
      >
        Hello, welcome back {userRedux?.userInfo?.name}
      </Text>
      <Button
        title="Logout"
        onPress={() => {
          void (async () => {
            await logout();
          })();
        }}
      />
      <FlatList
        data={listStory}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            description={item.description}
            photoUrl={item.photoUrl}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#3182CE",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    borderRadius: 12,
  },
  name: {
    fontSize: 20,
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
  },
  image: {
    width: "100%",
    height: 200,
  },
});

export default HomeScreen;
