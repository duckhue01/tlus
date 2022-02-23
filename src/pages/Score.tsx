import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ScoreDetail from "../templates/score/ScoreDetail";
import ScoreStat from "../templates/score/ScoreStat";
import { FONTS } from "../assets/constants";
import { View } from "react-native";

import NetInfo from "@react-native-community/netinfo";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import ServerErrorTemplate from "../templates/ServerErrorTemplate";


const Tab = createMaterialTopTabNavigator();
const Score = () => {
  const theme = useContext(ThemeContext);
  const [counter, setCounter] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });
  }, [counter]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme!.grayPrimary
      }}
    >
      {isConnected !== false ? (
        <Tab.Navigator
          lazy={true}
          tabBarOptions={{
            activeTintColor: theme!.secondary,
            inactiveTintColor: theme!.graySecondary,
            indicatorStyle: {
              backgroundColor: theme!.secondary,
            },
            style: {
              height: 40,
              backgroundColor: theme!.primary,
            },
            labelStyle: { ...FONTS.h4 },

          }}
        >
          <Tab.Screen
            name="score_stat"
            component={ScoreStat}
            options={{
              title: "Thống kê",
            }}
          />
          <Tab.Screen
            name="score_detail"
            component={ScoreDetail}
            options={{
              title: "Chi tiết",
            }}
          />
        </Tab.Navigator>
      ) : (
        <ServerErrorTemplate
          reconnect={() => {
            setCounter(counter + 1);
          }}
          message="Vui lòng kiểm tra kết nối internet và thử lại!!!"
        />
      )}
    </View>
  );
};

export default Score;
