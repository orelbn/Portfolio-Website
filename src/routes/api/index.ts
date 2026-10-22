import { defineHandler } from "void/handler";

export const GET = defineHandler(() => ({
  name: "Portfolio API",
  timestamp: new Date().toISOString(),
}));
