import ky from "ky";

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "/";

const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],

    afterResponse: [
      (_request, _options, response) => {
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      },
    ],
  },
});

export default apiClient;
