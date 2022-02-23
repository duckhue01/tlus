import AsyncStorage from "@react-native-async-storage/async-storage";
import userAPI from "../api/userAPI";

export class UserService {
  constructor() { }

  static getInfo = async (): Promise<UserInfo> => {
    return JSON.parse((await AsyncStorage.getItem("user_info"))!);
  };

  static setInfo = async (token: string): Promise<boolean> => {
    console.log("in set infor" + token);

    const data = await userAPI(token);
    console.log(data);
    

    if (data !== null) {
      await AsyncStorage.setItem("user_info", JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  };

  static setUserNameAndPassword = async (
    userName: string,
    password: string
  ) => {
    await AsyncStorage.setItem("user_name", JSON.stringify(userName));
    await AsyncStorage.setItem("password", JSON.stringify(password));
  };

  static getUserNameAndPassword = async (): Promise<{
    username: string;
    password: string;
  }> => {
    const username = await AsyncStorage.getItem("user_name");
    const password = await AsyncStorage.getItem("password");
    return {
      username: JSON.parse(username!),
      password: JSON.parse(password!),
    };
  };


  static deleteUserInfo = async () => {
    await AsyncStorage.removeItem("user_name");
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("user_info");
  }


}
