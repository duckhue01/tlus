import React, { useContext, useState } from "react";
import { Text } from "react-native";

import { Card, Paragraph } from "react-native-paper";

import { COLORS, FONTS } from "../assets/constants";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

const TestCard = ({ test }: { test: TestModel }) => {
  // const status = test.status === 0 ? "black" : COLORS.red;
  const theme = useContext(ThemeContext);
  return (
    <Card
      style={{
        marginTop: 5,
        backgroundColor: theme!.primary,
        marginHorizontal: 10,
        borderRadius: 5,
      }}
    >
      <Card.Content
        style={{
          paddingTop: 8,
        }}
      >
        <Paragraph
          style={{
            padding: 2,
            ...FONTS.h4,
            color: theme!.secondary,
          }}
        >
          {test.name}
        </Paragraph>
        <Paragraph
          style={{
            padding: 2,
            ...FONTS.body4,
            color: theme!.graySecondary,
            paddingBottom: 5,
          }}
        >
          {`Số báo danh: ${test.testCode}`}
        </Paragraph>
        <Paragraph>
          <Text
            style={{
              ...FONTS.body4,
              color: theme!.graySecondary,
            }}
          >
            <Ionicons name="location-outline" size={15} color={theme!.graySecondary} />
            {`${test.roomCode}    `}
          </Text>

          <Text
            style={{
              ...FONTS.body4,
              color: theme!.graySecondary,
            }}
          >
            <Ionicons name="time-outline" size={15} color={theme!.graySecondary} />
            {`${test.testTime}    `}
          </Text>

          <Text
            style={{
              ...FONTS.body4,
              color: theme!.graySecondary,
            }}
          >
            <Fontisto name="date" size={13} color={theme!.graySecondary} />
            {`${test.testDate}    `}
          </Text>
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default TestCard;
