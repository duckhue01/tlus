import { UserService } from "../services/UserService";

const authenticationAPI = async (
  username: string,
  password: string
): Promise<string | null> => {
  // let formData = new FormData();
  // formData.append("username", username);
  // formData.append("password", password);
  // formData.append("client_id", "education_client");
  // formData.append("grant_type", "password");
  // formData.append("client_secret", "password");
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

const getTokenAPI = async (): Promise<string | null> => {

  const { username, password } = await UserService.getUserNameAndPassword();
  if (username !== null && password !== null) {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("client_id", "education_client");
    formData.append("grant_type", "password");
    formData.append("client_secret", "password");
    try {
      const res = await fetch(
        "https://sinhvien.tlu.edu.vn:8099/education/oauth/token",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.access_token) return data.access_token;
      return null;
    } catch (e) {
      return null
    }
  } else {
    return null;
  }
};

export { authenticationAPI, getTokenAPI };
