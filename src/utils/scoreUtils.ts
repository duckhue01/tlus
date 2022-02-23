import { COLORS } from "../assets/constants";

const mark2Color = (mark: string): string => {
  switch (mark) {
    case "A":
      return COLORS.green;
      break;
    case "B":
      return COLORS.blue;
      break;
    case "C":
      return COLORS.yellow;
      break;
    case "D":
      return COLORS.orange;
      break;
    case "F":
      return COLORS.red;
      break;

    default:
      return theme!.graySecondary;
      break;
  }
};

const convertSemester = (str: string): string => {
  return str.slice(0, 6).replace("_20", ".");
};

export { mark2Color, convertSemester };
