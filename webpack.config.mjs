import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isProd = process.env.NODE_ENV === "production";

export default {
  mode: isProd ? "production" : "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
    publicPath: isProd ? "/todo-list/" : "/",
  },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/index.html",
        }),
  ],
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
            {
            test: /\.html$/i,
            use: ["html-loader"],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },
    ],
  },
};
