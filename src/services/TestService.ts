import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTokenAPI } from "../api/authenticationAPI";
import testAPI from "../api/testAPI";
import { extractTestData } from "../utils/testUtils";
import { UserService } from "./UserService";



export class TestService {
  private static userInfo = undefined;

  static getUserInfo = async () => {
    if (this.userInfo) {
      return this.userInfo;
    }
    return await UserService.getInfo();
  };

  static updateTest = async (): Promise<{
    data: TestModel[];
    lastUpdate: number;
  } | null> => {
    const token = await getTokenAPI();
    const data = await testAPI(token);
    const userId = (await this.getUserInfo()).id;
    if (token !== null && data !== null) {
      const extracted = extractTestData(data);
      AsyncStorage.setItem(
        `${userId}_test_schedule`,
        JSON.stringify({
          data: extracted,
          lastUpdate: Date.now(),
        })
      );
      return {
        lastUpdate: Date.now(),
        data: extracted,
      };
    } else {
      return null;
    }
  };

  static getTest = async (): Promise<{
    data: TestModel[];
    lastUpdate: number;
  } | null> => {
    const userId = (await this.getUserInfo()).id;

    const db = await AsyncStorage.getItem(`${userId}_test_schedule`);
    if (db !== null) {
      return JSON.parse(db);
    } else {
      const token = await getTokenAPI();
      const data = await testAPI(token);

      if (token !== null && data !== null) {
        const extracted = extractTestData(data);
        AsyncStorage.setItem(
          `${userId}_test_schedule`,
          JSON.stringify({
            data: extracted,
            lastUpdate: Date.now(),
          })
        );
        return {
          lastUpdate: Date.now(),
          data: extracted,
        };
      } else {
        return null;
      }
    }
  };

  static updateTestWithoutDownload = async (prev: {
    data: TestModel[];
    lastUpdate: number;
  }) => {
    const userId = (await this.getUserInfo()).id;
    AsyncStorage.setItem(`${userId}_test_schedule`, JSON.stringify(prev));
  };

}
