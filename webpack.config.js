const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": require.resolve("browserify-fs"),
      "readline": false
    }
  }
}; 