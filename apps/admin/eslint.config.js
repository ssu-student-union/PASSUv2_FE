// @ts-check
import config from "@passu/eslint-config";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";

export default [
  ...config,
  {
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    rules: {
      // enable all recommended rules to report a warning
      ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
      // enable all recommended rules to report an error
      ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/styles.css",
      },
    },
  },
];
