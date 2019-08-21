// const config = require("./webpack/webpack.dev.config");
const path = require("path");

module.exports = config => {
  config.set({
    files: [{ pattern: "tests/**/*.spec.js", watched: true }],

    frameworks: ["mocha"],

    reporters: ["mocha", "coverage-istanbul"],

    preprocessors: {
      "tests/**/*.spec.js": ["webpack"]
    },

    coverageIstanbulReporter: {
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      reports: ["html", "lcovonly", "text-summary"],

      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, "coverage"),

      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,

      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // Omit files with no statements, no functions and no branches from the report
      skipFilesWithNoCoverage: true,

      // Most reporters accept additional config options. You can pass these through the `report-config` option
      "report-config": {
        // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: "html"
        }
      }
    },

    webpack: {
      mode: "none",
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve("libs/"),
            use: {
              loader: "istanbul-instrumenter-loader"
            }
          }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chai"),
      require("karma-chrome-launcher"),
      require("karma-mocha-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("istanbul-instrumenter-loader"),
      require("karma-chai-as-promised")
    ],

    browsers: ["Chrome"]
  });
};
