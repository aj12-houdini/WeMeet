import { ApiClient } from "./ApiClient";

export class AuthApi extends ApiClient {
  login(email, password) {
    return this.sendJson("auth/login", {
      method: "POST",
      body: new URLSearchParams({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });
  }

  async isLoggedIn() {
    try {
      const data = await this.sendJson("dashboard", {
        method: "GET",
        headers: {
          tokenKey: localStorage.getItem("token"),
        },
      });
      if (data.message == "succesfull") return true;
      else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const authApi = new AuthApi();
