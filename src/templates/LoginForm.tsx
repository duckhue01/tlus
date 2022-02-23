import React, { useContext, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";

import { Snackbar, TextInput } from "react-native-paper";
import { authenticationAPI } from "../api/authenticationAPI";
import { AuthContext } from "../context/AuthContext";
import { COLORS, FONTS } from "../assets/constants";
import { UserService } from "../services/UserService";
import { Keyboard } from "react-native";
import { useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
const LoginForm = () => {
  const { state, dispatch } = useContext(AuthContext)!;
  const [userName, setUserName] = useState<string>("1951060640");
  const [password, setPassword] = useState<string>("001201020636");
  const [isAccept, setIsAccept] = useState<{
    status: number;
    message: string | null;
  }>({
    status: 0,
    message: null,
  });
  const [visible, setVisible] = useState(false);
  const theme = useContext(ThemeContext);
  const LoginHandler = async () => {
    const token = await authenticationAPI(userName, password);
    
    if (token) {
      console.log("in token");
      
      const ok = await UserService.setInfo(token);
      await UserService.setUserNameAndPassword(userName, password);
      console.log(ok);
      
      if (ok === true) {
        setIsAccept({
          status: 1,
          message: null,
        });
      } else {
        setIsAccept({
          status: -2,
          message: "Lỗi server",
        });
      }
    } else {
      setIsAccept({
        status: -1,
        message: "Đăng nhập thất bại",
      });
    }
  };

  useEffect(() => {
    if (isAccept.status === 1) {
      Keyboard.dismiss();
      dispatch({ type: "LOGIN", isPremium: false });
    }
  }, [isAccept]);

  return (
    <View style={{
      padding: 20,
      marginHorizontal: 10,
    }}>
      <Text style={{
        ...FONTS.h4,
        color: theme!.secondary,
        textTransform: "uppercase",
        fontSize: 12,
      }}>thông tin đăng nhập</Text>
      <TextInput
        label="Tên đăng nhập"
        textContentType="username"
        selectionColor={theme!.primary}
        keyboardType="numeric"
        onChangeText={(text) => {
          setUserName(text);
          setIsAccept({
            status: 0,
            message: null,
          });
        }}
        value={userName}
        error={isAccept.status === -1 ? true : false}
        autoFocus={Platform.OS === "ios" ? true : false}
        theme={{ colors: { primary: theme!.primary } }}
      />
      <View>
        <TextInput
          label="Mật khẩu"
          textContentType="password"
          secureTextEntry={!visible}
          selectionColor={theme!.primary}
          onChangeText={(text) => {
            setPassword(text);
            setIsAccept({
              status: 0,
              message: null,
            });
          }}
          value={password}
          style={styles.input}
          error={isAccept.status === -1 ? true : false}
          right={
            visible ? (
              <TextInput.Icon
                name="eye-off"
                onPress={() => {
                  setVisible(!visible);
                }}
              />
            ) : (
              <TextInput.Icon
                name="eye"
                onPress={() => {
                  setVisible(!visible);
                }}
              />
            )
          }
          theme={{
            colors: {
              primary: theme!.primary,
            },
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: theme!.secondary,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={LoginHandler}
      >
        {isAccept.status === 1 ? (
          <ActivityIndicator size="small" color={theme!.primary} />
        ) : (
          <Text
            style={{
              ...FONTS.h4,
              color: theme!.primary,
              textTransform: "uppercase",
            }}
          >
            Đăng nhập
          </Text>
        )}
      </TouchableOpacity>

      <Text
        style={{
          ...FONTS.h4,
          color: theme!.secondary,
          textTransform: "uppercase",
          fontSize: 10,
          textDecorationLine: "underline",
        }}
        onPress={() => Linking.openURL("https://sinhvien.tlu.edu.vn/#/login")}
      >
        https://sinhvien.tlu.edu.vn/#/login
      </Text>
      <Snackbar
        visible={isAccept.status < 0 ? true : false}
        onDismiss={() =>
          setIsAccept({
            status: 0,
            message: null,
          })
        }
        duration={2000}
        wrapperStyle={{
          position: "relative",
        }}
        style={{
          backgroundColor: COLORS.red,
        }}
      >
        {isAccept.message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({

  input: {
    marginTop: 10,
  },


});

export default LoginForm;
