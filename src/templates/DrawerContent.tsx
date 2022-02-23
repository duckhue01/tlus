import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Button, Switch } from "react-native-paper";
import { FONTS } from "../assets/constants";
import { UserService } from "../services/UserService";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ScoreService from "../services/ScoreService";

const DrawerContent = (props: any) => {
  const [user, setUser] = useState<UserInfo>();
  const { dispatch } = useContext(AuthContext)!;
  const theme = useContext(ThemeContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(theme?.primary == "#212529" ? true : false);
  useEffect(() => {
    (async () => {
      setUser(await UserService.getInfo());
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Avatar.Image
          source={require("../assets/images/user_avatar.png")}
          size={50}
        />
        <View style={{ marginLeft: 10, flexDirection: "column" }}>
          <Text
            style={{
              ...FONTS.h4,
              color: theme!.secondary,
            }}
          >
            {user ? user.name : null}
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: theme!.graySecondary,
            }}
          >
            #{user ? user.id : null}
          </Text>
        </View>
      </View>

      <DrawerContentScrollView style={{ flex: 1 }}>
        <DrawerItemList
          {...props}
          inactiveTintColor={theme!.secondary}
          inactiveBackgroundColor={theme!.primary}
          activeBackgroundColor={theme!.secondary}
          activeTintColor={theme!.primary}
          labelStyle={{
            ...FONTS.h4,
          }}
        />

      </DrawerContentScrollView >

      <View
        style={{
          padding: 20,
          bottom: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <Button
          icon="logout"
          mode="outlined"
          onPress={async () => {
            await UserService.deleteUserInfo()
            ScoreService.deleteScore();
            dispatch({ type: "LOGOUT" });
          }}
          theme={{
            colors: {
              primary: theme!.secondary,
            },
          }}
        >
          đăng xuất
        </Button>
        <Switch value={isSwitchOn} onValueChange={async (value) => {
          setIsSwitchOn(!isSwitchOn)
          if (value) {
            theme?.setMode("dark")
          } else {
            theme?.setMode("light")
          }
        }} 
        color="black"
        />
      </View>
    </View >
  );
};



export default React.memo(DrawerContent);
