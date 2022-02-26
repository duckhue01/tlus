import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Score from "../pages/Score";
import { SIZES } from "../assets/constants/index";
import DrawerContent from "../templates/DrawerContent";
import TestSchedule from "../pages/TestSchedule";
import TuitionFee from "../pages/TuitionFee";
import Calendar from "../pages/Calendar";
import { ThemeContext } from "../context/ThemeContext";
import React, { useContext } from "react";
const Drawer = createDrawerNavigator();

const AppNavigation = ({ setTheme }: any) => {
  const theme = useContext(ThemeContext);
  return (

    <NavigationContainer>
      <Drawer.Navigator
        drawerType="slide"
        edgeWidth={SIZES.width / 2}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerPosition="left"
        drawerStyle={{
          width: 250,
          backgroundColor: theme!.primary,
          borderRadius: 5,
          marginVertical: 20,
        }}
      >
        <Drawer.Screen
          name="score"
          component={Score}
          options={{ drawerLabel: "Điểm số" }}
        />

        <Drawer.Screen
          name="test_schedule"
          component={TestSchedule}
          options={{ drawerLabel: "Lịch thi" }}
        />
        <Drawer.Screen
          name="calendar"
          component={Calendar}
          options={{ drawerLabel: "Lịch học" }}
        />


        <Drawer.Screen
          name="tuition_fee"
          component={TuitionFee}
          options={{ drawerLabel: "Học phí" }}
        />


      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
