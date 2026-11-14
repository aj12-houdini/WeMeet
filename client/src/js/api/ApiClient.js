import { API_BASE_URL } from "../config";

// Base class for talking to the server. Subclasses only describe their own
// endpoints; building the URL and sending the request happens here.
export class ApiClient {
  sendRequest(path, options) {
    return fetch(API_BASE_URL + path, options);
  }

  async sendJson(path, options) {
    const response = await this.sendRequest(path, options);
    return response.json();
  }

  currentUserId() {
    return localStorage.getItem("id");
  }
}
