import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

const pkg = require("./package.json");

export default {
  input: "./src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  plugins: [
    replace({
      VERSION: pkg.version
    }),
    typescript({
      typescript: require("typescript")
    }),
    babel({
      exclude: "node_modules/**"
    }),
    process.env.BUILD === "production" ? uglify() : null
  ]
};
