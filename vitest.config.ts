import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      include: ["schema/**/*.ts", "tools/**/*.ts"],
    },
    include: ["tests/**/*.test.ts"],
  },
});
