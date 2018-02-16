const fs = require("fs");
const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const webpackDefine = require("./webpack.define");

const sourcePath = path.resolve("src");

function getCoreConfig(entry, outputPath, isProduction) {
  return {
    entry: "./src/" + entry,
    output: {
      path: path.resolve(outputPath),
      filename: "bundle.js",
      libraryTarget: "umd"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".scss"] // search for files ending with these extensions when importing
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader", // compile typescript
          options: {
            configFile: path.join(sourcePath, "tsconfig.json")
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: ["css-loader"]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader", // turn url() and @import calls into require
                options: {
                  minimize: isProduction,
                  importLoaders: 1 // pipe @imported files through the autoprefixer
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins: [autoprefixer]
                }
              },
              "sass-loader" // compile sass
            ]
          })
        },
        {
          //Website assets
          test: /\.(jpg|ttf|otf|svg|png|mp4|mp3)/,
          use: {
            loader: "file-loader", // copy files to proxy and update paths to be absolute
            options: {
              name: "[path][name].[ext]"
            }
          },
          include: sourcePath
        },
        {
          //Ico files should be in the root
          test: /\.(ico)/,
          use: {
            loader: "file-loader", // copy files to output and update paths to be absolute
            options: {
              name: "[name].[ext]",
              publicPath: "/"
            }
          },
          include: sourcePath
        }
      ]
    },
    plugins: []
  };
}

function makeConfig(env, entry, outputPath) {
  const isProduction = env && !!env.production;
  console.log(`Building: '${entry}' -> '${outputPath}'`);
  const define = { WEBPACK_CONFIG: JSON.stringify(webpackDefine(isProduction)) };
  const config = getCoreConfig(entry, outputPath, isProduction);
  config.plugins.push(new ExtractTextPlugin({ filename: "styles.css" }));
  if (isProduction) {
    define["process.env.NODE_ENV"] = JSON.stringify("production");
  }

  if (isProduction) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      })
    );
  } else {
    config.devtool = "eval";
  }

  config.plugins.push(new webpack.DefinePlugin(define));

  config.plugins.push(
    new CopyWebpackPlugin([{ from: "src/assets/polyfills", to: "polyfills" }]),
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, "index.html.ejs")
    })
  );

  return config;
}

function excludeNodeModules(nodeModulesPath, includeNodeModules) {
  return fs.readdirSync(nodeModulesPath).filter(function(x) {
    return x !== ".bin" && (!includeNodeModules || includeNodeModules.indexOf(x) === -1);
  });
}

function makeRuntimeConfig(env) {
  return [makeConfig(env, "index", "www")];
}

module.exports = process.env.GENERATE ? makeGeneratorConfig : makeRuntimeConfig;
