import React, { useRef } from "react";
import {
  View,
  Image,
  Text,
  Animated,
} from "react-native";
import { Button } from "react-native-paper";
import { COLORS, FONTS } from "../assets/constants";
import ChartSVG from "../assets/svg/ChartSVG";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
const Landing = ({ navigation }: any) => {
  const botUp1 = useRef(new Animated.Value(200)).current;
  const botUp2 = useRef(new Animated.Value(200)).current;
  const scaleUp = useRef(new Animated.Value(0.01)).current;
  const topDown = useRef(new Animated.Value(-200)).current;
  const theme = useContext(ThemeContext);
  React.useEffect(() => {
    Animated.spring(botUp1, {
      toValue: 0,
      useNativeDriver: true,
      delay: 200,
      friction: 8,
    }).start();
    Animated.spring(botUp2, {
      toValue: 0,
      useNativeDriver: true,
      delay: 300,
      friction: 8,
    }).start();
    Animated.spring(scaleUp, {
      toValue: 1,
      useNativeDriver: true,
      delay: 100,
      friction: 8,
    }).start();
    Animated.spring(topDown, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      delay: 0,
    }).start();
  }, [scaleUp, botUp1, botUp2, topDown]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme!.primary
      }}
    >

      <View
        style={{
          margin: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("../assets/images/app_logo.png")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 5,
          }}
        />
        <Image
          source={require("../assets/images/shool_logo.png")}
          style={{
            width: 48,
            height: 40,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          margin: 20,
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateY: topDown }],
          }}
        >
          <ChartSVG
            width="100%"
            height={200}
            strokeWidth={10}
            stroke="#000"
          />
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              {
                scale: scaleUp,
              },
            ],
          }}
        >
          <Text
            style={{
              ...FONTS.h1,
              color: theme!.secondary,
              paddingVertical: 10,
            }}
          >
            Tlu Student
          </Text>
          <Text
            style={{
              ...FONTS.h4,
              color: theme!.graySecondary,
            }}
          >
            Một ứng dụng nhỏ sẽ giúp ban trở nên chủ động hơn trong việc học tập
          </Text>
        </Animated.View>
        <View>
          <Animated.View
            style={{
              transform: [{ translateY: botUp1 }],
            }}
          >
            <Button
              onPress={() => {
                navigation.navigate("login");
              }}
              mode="contained"
              labelStyle={{
                ...FONTS.h4,
                letterSpacing: 0,
                color: theme!.primary,
              }}
              theme={{
                colors: {
                  primary: theme!.secondary,
                },
              }}
            >
              Bắt đầu
            </Button>
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ translateY: botUp2 }],
              marginTop: 20,
            }}
          >

          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Landing;
