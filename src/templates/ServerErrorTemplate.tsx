import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { FONTS, SIZES } from "../assets/constants";
import ServerError from "../assets/svg/ServerError";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
const ServerErrorTemplate = ({
  reconnect,
  message,
}: {
  reconnect?: Function;
  message: string;
}) => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <ServerError width={200} height={200} />
      <Text
        style={{
          ...FONTS.h4,
          color: theme!.graySecondary,
          textAlign: "center",
          width: SIZES.width - 80,
        }}
      >
        {message}
      </Text>

      <Button
        mode="contained"
        onPress={() => {
          reconnect ? reconnect() : null;
        }}
        disabled={reconnect ? false : true}
        labelStyle={{
          ...FONTS.h4,
          letterSpacing: 0,
        }}
        style={{
          marginTop: 10,
        }}
        theme={{
          colors: {
            primary: theme!.secondary,
          },
        }}
      >
        Kết nối lại
      </Button>
    </View>
  );
};
export default ServerErrorTemplate;
