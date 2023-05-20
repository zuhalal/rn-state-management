import React, { useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
} from "react-native";
import { useAuthContext } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { user, login, message } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigation.replace("Home");
    }
  }, [user]);

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
      {message && <Text style={styles.message}>{message}</Text>}
      <Button
        onPress={() => {
          void (async () => {
            await login(email, password);
          })();
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
