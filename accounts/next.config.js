const {
  withModuleFederation,
  MergeRuntime,
} = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
  basePath: "/accounts",
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      name: "accounts",
      library: { type: config.output.libraryTarget, name: "accounts" },
      filename: "static/runtime/remoteEntry.js",
      remotes: {
        // For SSR, resolve to disk path (or you can use code streaming if you have access)
        home: isServer
          ? path.resolve(
              __dirname,
              "../home/.next/server/static/runtime/remoteEntry.js"
            )
          : "home", // for client, treat it as a global
      },
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    if (!isServer) {
      config.output.publicPath = "http://localhost:3002/_next/";
    }

    config.plugins.push(new MergeRuntime());

    return config;
  },
};
