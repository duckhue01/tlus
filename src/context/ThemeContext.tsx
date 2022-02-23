import React from "react";


export const ThemeContext = React.createContext<
  {
    primary: string;
    secondary: string;
    grayPrimary: string;
    graySecondary: string;
    setMode: any
  }
  | undefined
>(undefined);
