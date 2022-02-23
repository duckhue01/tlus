import React, { useMemo } from "react";
import { View, Text } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { FONTS } from "../../assets/constants";
import { Button } from "react-native-paper";
import * as Linking from "expo-linking";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
const BottomSheetCalender = React.forwardRef<
  any,
  {
    sheet: any;
    setSheet: any;
  }
>((props, ref) => {
  const { sheet, setSheet } = props;

  const zoomID = require("../../../zoomID.json")[sheet?.room];
  const theme = useContext(ThemeContext);
  return (
    <BottomSheet
      //   @ts-ignore
      ref={ref}
      index={-1}
      snapPoints={useMemo(() => [1, 250, 320], [])}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
      )}
      onAnimate={(_, to) => {
        if (to == 0 || to == -1) {
          setSheet(undefined);
        }
      }}
      backgroundStyle={{
        backgroundColor: theme!.primary,
        borderRadius: 5,
      }}
    >
      <View
        style={{
          margin: 10,
          borderWidth: 1,
          padding: 10,
          borderColor: theme!.graySecondary,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: theme!.secondary,
            ...FONTS.h3,
          }}
        >
          {sheet?.name}
        </Text>
        <Text
          style={{
            color: theme!.secondary,
            ...FONTS.body4,
            marginBottom: 10,
            alignSelf: 'flex-start'
          }}
          selectable={true}
        >
          {zoomID}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                color: theme!.graySecondary,
                ...FONTS.body4,
              }}
            >
              Thời gian
            </Text>
            <Text
              style={{
                color: theme!.secondary,
                ...FONTS.h4,
              }}
            >
              {sheet?.start.string} - {sheet?.end.string}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                color: theme!.graySecondary,
                ...FONTS.body4,
              }}
            >
              Phòng học
            </Text>

            <Text
              style={{
                color: theme!.secondary,
                ...FONTS.h4,
              }}
            >
              {sheet?.room}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                color: theme!.graySecondary,
                ...FONTS.body4,
              }}
            >
              Tiết học
            </Text>
            <Text
              style={{
                color: theme!.secondary,
                ...FONTS.h4,
              }}
            >
              {sheet?.start.name} - {sheet?.end.name}
            </Text>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => {
            Linking.openURL(
              `zoomus://zoom.us/join?confno=${zoomID
                .toString()
                .replaceAll(" ", "")}`
            );
          }}
          style={{
            alignSelf: "center",
            paddingHorizontal: 20,
          }}
          theme={{
            colors: {
              primary: theme!.secondary,
            },
          }}
        >
          zoom
        </Button>
      </View>
    </BottomSheet>
  );
});

export default React.memo(BottomSheetCalender);
