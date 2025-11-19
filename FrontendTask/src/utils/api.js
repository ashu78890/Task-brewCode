const API_URL = "http://localhost:5000/api";

export const api = {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    localStorage.setItem("token", token);
  },

  clearToken() {
    localStorage.removeItem("token");
  },

  async request(endpoint, method = "GET", body) {
    const headers = {
      "Content-Type": "application/json",
    };

    const token = this.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Request failed");

    return data;
  }
};
