import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default {
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  languageOptions: {
    globals: globals.browser,
  },
  plugins: [pluginJs, tseslint, pluginReact],
  extends: [
    "plugin:react/recommended",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
