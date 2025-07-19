import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/users", () => {
    return HttpResponse.json([{ id: "1", name: "John Doe" }]);
  }),
];
