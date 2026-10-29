import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["script.js"],
    languageOptions: {
      globals: globals.browser,
      sourceType: "script"
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", { caughtErrors: "none" }]
    }
  }
];
