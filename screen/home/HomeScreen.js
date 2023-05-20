import React, { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  Button,
} from "react-native";
import { useAuthContext } from "../../context/AuthContext";
import { AppBar } from "../../components/AppBar";
import { useStoryContext } from "../../context/StoryContext";

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
  const { user, logout } = useAuthContext();
  const { listStory, fetchStory } = useStoryContext();

  useEffect(() => {
    if (!user) {
      navigation.replace("Login");
    } else {
      void (async () => {
        await fetchStory(user.token);
      })();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
        }}
      >
        Hello, welcome back {user?.name}
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
