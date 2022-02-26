import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../api/authentication";
import calendar from "../api/calendar";
import { CalendarData } from "../utils/dateUtils";
import { UserService } from "./UserService";

class CalendarService {
  private static userInfo = undefined;

  static getUserInfo = async () => {
    if (this.userInfo) {
      return this.userInfo;
    }
    return await UserService.getInfo();
  };

  static getCalendar = async (): Promise<null | {
    data: CalendarData;
    lastUpdate: number;
  }> => {
    const userId = (await this.getUserInfo()).id;
    const db = await AsyncStorage.getItem(`${userId}_calendar`);

    if (db !== null) {
      return JSON.parse(db);
    } else {
      const token = await getToken();
      const data = await calendar(token);


      if (token !== null && data !== null) {
        AsyncStorage.setItem(
          `${userId}_calendar`,
          JSON.stringify({
            data: data,
            lastUpdate: Date.now(),
          })
        );
        return {
          data: data,
          lastUpdate: Date.now(),
        };
      } else {
        return null;
      }
    }
  };

  static updateCalendar = async () => {
    const token = await getToken();
    const data = await calendar(token);
    const userId = (await this.getUserInfo()).id;
    if (token !== null && data !== null) {
      AsyncStorage.setItem(
        `${userId}_calendar`,
        JSON.stringify({
          data: data,
          lastUpdate: Date.now(),
        })
      );
      return {
        data: data,
        lastUpdate: Date.now(),
      };
    } else {
      return null;
    }
  };


}

export default CalendarService;
