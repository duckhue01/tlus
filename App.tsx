import React, { useState } from "react";
import { useReducer } from "react";
import { AuthContext } from "./src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigation from "./src/navigation/AppNavigation";
import { useEffect } from "react";
import LandingNavigation from "./src/navigation/LandingNavigation";
import { SafeAreaView } from "react-native-safe-area-context";


import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_700Bold,
  Ubuntu_500Medium,
} from "@expo-google-fonts/ubuntu";
import { ThemeContext } from "./src/context/ThemeContext";

export type ACTION_TYPE =
  | {
    type: "RESTORE_TOKEN";
    isLogin: boolean;
  }
  | {
    type: "LOGIN";
    isPremium: boolean | null;
  }
  | {
    type: "LOGOUT";
  };

export type STATE_TYPE = {
  isLoading: boolean;
  isLogin: boolean;
};


const themeJSON = require("./theme.json");

const reducer = (state: STATE_TYPE, action: ACTION_TYPE) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        isLoading: false,
        isLogin: action.isLogin,
      };

    case "LOGIN":
      return {
        ...state,
        isLogin: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isLogin: false,
      };
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isLogin: false,
  });

  const [theme, setTheme] = useState<
    {
      primary: string;
      secondary: string;
      grayPrimary: string;
      graySecondary: string;
    }
    | undefined
  >(undefined);
  const [mode, setMode] = useState<undefined | string>(undefined)



  useEffect(() => {
    if (mode) {
      (async () => {
        setTheme(themeJSON[mode]);
        await AsyncStorage.setItem("theme_mode", mode)
      })()
    }

  }, [mode])

  useEffect(() => {
    (async () => {
      try {
        const [userName, password, userInfo] = await Promise.all([AsyncStorage.getItem("user_name"),
        AsyncStorage.getItem("user_name"),
        AsyncStorage.getItem("user_name")
        ])

        const raw = await AsyncStorage.getItem("theme_mode")
        setMode(raw == null ? "light" : raw)

        setTheme(themeJSON[mode == null ? "light" : mode] == "light" ? themeJSON["light"] : themeJSON["dark"]);

        if (userName && password && userInfo) {
          dispatch({
            type: "RESTORE_TOKEN",
            isLogin: true,
          });
        } else {
          dispatch({
            type: "RESTORE_TOKEN",
            isLogin: false,
          });
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const [isLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  if (isLoaded && theme) {
    return (
      <AuthContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={{ ...theme, setMode }} >
          <SafeAreaView style={{ flex: 1, backgroundColor: theme.primary }}>
            {state.isLoading ? null : state.isLogin === false ? (
              <LandingNavigation />
            ) : (
              <AppNavigation setTheme={setTheme} />
            )}
          </SafeAreaView>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );
  }
  return null;
}
