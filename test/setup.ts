import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("src/env.mjs", () => ({
  env: {
    NODEMAILER_LOCAL_USER: "test-user",
    NODEMAILER_LOCAL_PASS: "test-pass",
    RESEND_API_KEY: "api-key",
  },
}));

export {};
