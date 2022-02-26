import { UserService } from "../services/UserService";

const authentication = async (
  username: string,
  password: string
): Promise<string | null> => {
  try {
    const res = await fetch(
      "https://sinhvien.tlu.edu.vn:8082/education/public/login/ext/loginnew",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password
        }),

      }
    );
    const data = await res.json();
    if (data.access_token) return data.access_token;
    return null;
  }
  catch (e) {
    return null
  }

};

const getToken = async (): Promise<string | null> => {
  const { username, password } = await UserService.getUserNameAndPassword();
  return authentication(username, password)
};

export { authentication, getToken };
