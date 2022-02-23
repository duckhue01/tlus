import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import LoginForm from "../templates/LoginForm";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";


const Login = ({ navigation }: any) => {
  const theme = useContext(ThemeContext);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1, backgroundColor: theme!.primary }}>
        <Ionicons
          name="chevron-back"
          size={40}
          color={theme!.secondary}
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginLeft: 20,
          }}
        />
        <LoginForm />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
