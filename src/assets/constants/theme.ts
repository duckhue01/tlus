import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  white: "#fff",
  blue: "#03045e",
  violet: "#822faf",
  green: "#248232",
  red: "#d90429",
  yellow: "#ffff24",
  black: "#000",
  orange: "#fb8500",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  padding2: 36,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "Ubuntu_700Bold", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Ubuntu_700Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Ubuntu_700Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Ubuntu_700Bold", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
