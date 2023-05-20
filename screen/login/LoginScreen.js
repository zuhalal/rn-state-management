import React, { useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/auth/authAction";
import { getAuthUser } from "../../redux/auth/authSelector";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const userRedux = useSelector(getAuthUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userRedux.userToken !== "") {
      navigation.replace("Home");
    }
  }, [userRedux]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      {userRedux.error && <Text style={styles.message}>{userRedux.error}</Text>}
      <Button
        onPress={() => {
          dispatch(userLogin({ email, password }));
        }}
        title="Login"
        color="#3182CE"
        accessibilityLabel="Learn more about this purple button"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  message: {
    color: "red",
  },
});

export default LoginScreen;
