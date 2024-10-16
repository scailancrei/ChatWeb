import globals from "globals"
import pluginJs from "@eslint/js"
import html from "eslint-plugin-html"

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    files: ["**/*.html"],
    plugins: { html }
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "arrow-body-style": ["error", "always"]
    }
  }
]
