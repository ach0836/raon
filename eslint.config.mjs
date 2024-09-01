import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default {
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  languageOptions: {
    globals: globals.browser,
  },
  plugins: [pluginJs, tseslint, pluginReact],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
