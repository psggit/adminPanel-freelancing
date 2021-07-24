const path = require("path");
//const webpack = require('webpack')

module.exports = (config) => {
  const alias = {
    Components: path.resolve(__dirname, "./src/components"),
    Container: path.resolve(__dirname, "./src/container"),
    Styles: path.resolve(__dirname, "./src/styles"),
    // Constants: path.resolve(__dirname, "./src/constants"),
    // Sass: path.resolve(__dirname, "./src/sass"),
    Utils: path.resolve(__dirname, "./src/utils"),
    Images: path.resolve(__dirname, "./src/assets"),
  };

  config.resolve.alias = alias;

  // config.plugins = [
  //   new webpack.DefinePlugin({
  //     "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL || "hipbar-dev.com"),
  //     "process.env.PAYU_BASE": JSON.stringify(process.env.PAYU_BASE || "test"),
  //   })
  //]
  return config;
};
