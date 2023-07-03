import path from "node:path";
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import {getMode} from "./src/helpers/getMode.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const webpackMode = getMode();

const config = {
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

export default () => {
  config.mode = webpackMode;
  return config;
};