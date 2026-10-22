import { defineHandler } from "void/handler";

export const GET = defineHandler(() => ({ status: "ok", worker: "running" }));
