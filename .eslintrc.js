module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["duplicate-code"],
  rules: {
    "max-lines-per-function": ["error", { max: 20 }],
    "max-params": ["error", { max: 3 }],
  },
};
