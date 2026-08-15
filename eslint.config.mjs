import pluginJs from "@eslint/js";
import eslintPluginPlaywright from "eslint-plugin-playwright";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";
import configPrettier from "eslint-config-prettier";

export default [
  {
    ignores: [
      "node_modules/**",
      "playwright-report/**",
      "playwright-report-ci/**",
      "test-results/**",
      "playwright/.auth/**",
      "package-lock.json",
      ".ai-temp/**",
      ".ai-outputs/**"
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node
      },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false
      }
    },
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    }
  },
  {
    files: ["tests/**/*.ts"],
    ...eslintPluginPlaywright.configs["flat/recommended"],
    settings: {
      playwright: {
        globalAliases: {
          test: ["setup"]
        }
      }
    }
  },
  configPrettier
];
