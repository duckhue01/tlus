import React, { useContext } from "react";
import { View, Text } from "react-native";
import {  FONTS, SIZES } from "../assets/constants";
import { ThemeContext } from "../context/ThemeContext";
import { formatDate } from "../utils/dateUtils";

const CalendarDay = ({ day }: any) => {
  const theme = useContext(ThemeContext);
  if (day) {
    const date = formatDate(new Date(day?.timestamp));
    return (
      <View
        style={{
          width: SIZES.width,
          paddingTop: 20,
          paddingLeft: 10,
        }}
      >
        <Text
          style={{
            ...FONTS.h4,
            letterSpacing: 0.8,
            color: theme!.graySecondary,
          }}
        >
          {date}
        </Text>
      </View>
    );
  } else {
    return null;
  }
};

export default CalendarDay;
