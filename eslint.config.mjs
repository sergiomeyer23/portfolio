import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["tests/**/*.spec.js"],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      sourceType: "commonjs"
    },
    rules: js.configs.recommended.rules
  },
  {
    files: ["tests/support/**/*.cjs", "playwright.config.cjs"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs"
    },
    rules: js.configs.recommended.rules
  },
  {
    files: ["eslint.config.mjs", "stylelint.config.mjs"],
    languageOptions: {
      globals: globals.node,
      sourceType: "module"
    },
    rules: js.configs.recommended.rules
  }
];
