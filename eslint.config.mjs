import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.d.ts",
    ],
    rules: {
      // Allow localized content with apostrophes/quotes in JSX text
      "react/no-unescaped-entities": "off",
      // Disable strict TypeScript rules for build
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/triple-slash-reference": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@next/next/no-assign-module-variable": "warn",
      // Keep existing project defaults
    },
  },
];

export default eslintConfig;
