export const config = {
  server: {
    baseUrl: process.env["SERVER_BASE_URL"] ?? "http://localhost:3000",
  },
} as const;
