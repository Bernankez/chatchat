/** @type {import("prettier").Config} */
const config = {
  printWidth:120,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  quoteProps:'consistent',
  jsxSingleQuote:false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  singleAttributePerLine: false
};

export default config;