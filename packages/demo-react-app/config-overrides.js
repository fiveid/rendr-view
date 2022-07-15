const path = require("path");

module.exports = {
  webpack: (config, env) => {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      buffer: require.resolve("buffer/"),
      react: path.resolve("../../../node_modules/react")
    });
    config.resolve.fallback = fallback;
    config.ignoreWarnings = [/Failed to parse source map/]; // gets rid of a billion source map warnings
    return config;
  }
};
