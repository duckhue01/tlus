import React, { useContext } from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";
import { FONTS, SIZES } from "../assets/constants";
import { ThemeContext } from "../context/ThemeContext";

const CalendarItem = ({ item, firstItem, setSheet }: any) => {
  const theme = useContext(ThemeContext);

  return (
    <List.Item
      title={item.name}
      description={item.room}
      left={(props: any) => (
        <View
          style={{
            height: 60,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme!.secondary,
              ...FONTS.h2,
            }}
          >
            {`${item?.start?.string}`}
          </Text>
        </View>
      )}
      onPress={() => {
        setSheet(item);
      }}
      descriptionStyle={{
        ...FONTS.body4,
        color: theme!.graySecondary,
      }}
      titleStyle={{
        ...FONTS.h4,
        color: theme!.secondary,
      }}
      style={{
        marginTop: firstItem ? 45 : 0,
        left: firstItem ? -SIZES.width : 0,
        width: SIZES.width - 20,
        backgroundColor: theme?.primary,
        margin: 10,
        borderRadius: 5,
      }}
    />
  );
};

export default React.memo(CalendarItem);
