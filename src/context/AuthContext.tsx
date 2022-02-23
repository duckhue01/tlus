import React from "react";
import { ACTION_TYPE, STATE_TYPE } from "../../App";

export const AuthContext = React.createContext<
  | {
      state: STATE_TYPE;
      dispatch: React.Dispatch<ACTION_TYPE>;
    }
  | undefined
>(undefined);
