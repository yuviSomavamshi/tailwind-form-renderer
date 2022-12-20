import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES5'
          }
        }
      }),
      cleanup({ extensions: ['js', 'ts', 'jsx', 'tsx'] }),
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      external(),
      resolve(),
      terser(),
    ],
  },
];
