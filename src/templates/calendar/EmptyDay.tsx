import React, { useContext } from "react";
import { View, Text } from "react-native";
import {  FONTS } from "../../assets/constants";
import Empty from "../../assets/svg/Empty";
import { ThemeContext } from "../../context/ThemeContext";

const EmptyDay = () => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: -50,
        paddingHorizontal: 40,
      }}
    >
      <Empty width={160} height={160} color={theme!.primary} />
      <Text
        style={{
          textAlign: "center",
          color: theme!.graySecondary,
          ...FONTS.body4,
          marginTop: 20,
        }}
      >
        Hiện tại bạn chưa có lịch học
      </Text>
    </View>
  );
};

export default EmptyDay;
