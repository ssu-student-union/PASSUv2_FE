// @ts-check

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";
export default tseslint.config(
  { ignores: ["dist", "**/*.{cjs,js}", "**/*.gen.ts"] },
  js.configs.recommended,
  tseslint.configs.eslintRecommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  reactHooks.configs["recommended-latest"],
  {},
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "better-tailwindcss/no-unregistered-classes": [
        "error",
        {
          ignore: [
            "text-h1",
            "text-h2",
            "text-h3",
            "text-h4",
            "text-h5",
            "text-h6",
            "text-subtitle1",
            "text-subtitle2",
            "text-subtitle3",
            "text-body1",
            "text-body2",
          ],
        },
      ],
    },
  },
  prettier
);
