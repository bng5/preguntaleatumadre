const path = require('path');

module.exports = {
  entry: "./_js/entry.js",
  output: {
    path: path.join(__dirname, "/assets/"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  }
};
