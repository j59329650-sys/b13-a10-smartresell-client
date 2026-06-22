import { auth } from "@/lib/auth"; // আপনার backend/shared auth instance এর পাথ
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);