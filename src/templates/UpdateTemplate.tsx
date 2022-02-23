import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { FONTS } from "../assets/constants";
import { View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
const UpdateTemplate = ({
  update,
  lastUpdate,
}: {
  update: Function;
  lastUpdate: number | undefined;
}) => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        backgroundColor: theme!.primary,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        flexDirection: "row",
        padding: 5,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Ionicons name="reload" size={16}
        color={theme!.secondary}
        onPress={() => {
          update();
        }}
        style={{
          marginLeft: 10,
        }} />

      {lastUpdate ? (
        <Text
          style={{
            ...FONTS.body4,
            color: theme!.graySecondary,
            textAlign: "right",
            marginRight: 10,
          }}
        >
          {new Date(lastUpdate).toLocaleString("vi-VN")}
        </Text>
      ) : (
        <ContentLoader
          width={100}
          height={10}
          foregroundColor={theme!.graySecondary}
          backgroundColor={theme!.grayPrimary}
          style={{
            alignSelf: "center",
            marginRight: 10,
          }}
        >
          <Rect x="0" y="0" rx="2" ry="2" width="100%" height="5" />
        </ContentLoader>
      )}
    </View>
  );
};
export default UpdateTemplate;
