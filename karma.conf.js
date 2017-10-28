'use strict';
// Karma configuration
// Generated on Sat Oct 28 2017 13:15:36 GMT-0700 (PDT)

const assert = require(`assert`);
const pkg = require(`./package`);

module.exports = function configure(config) {
  let customLaunchers = {};
  let browsers = [
    `Chrome`,
    `Firefox`,
    `Safari`
  ];
  if (process.env.CI) {
    assert(process.env.SAUCE_USERNAME);
    assert(process.env.SAUCE_ACCESS_KEY);
    customLaunchers = {
      sl_chrome: {
        base: `SauceLabs`,
        browserName: `chrome`,
        version: `latest`
      },
      sl_firefox: {
        base: `SauceLabs`,
        browserName: `firefox`,
        version: `latest`
      }
    };

    browsers = Object.keys(customLaunchers);
  }

  config.set({
    // enable / disable watching file and executing tests whenever any file
    // changes
    autoWatch: true,

    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // Concurrency level
    // how many browser should be started simultaneous
    // (Sauce Labs' Open Sauce limits to 5 vms)
    concurrency: process.env.CI ? 5 : Infinity,

    customLaunchers,

    // list of files / patterns to load in the browser
    files: [
      `src/**/*-spec.js`
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      `mocha`
    ],

    junitReporter: {
      // function (browser, result) to customize the classname attribute in xml
      // testcase element
      classNameFormatter(browser, result) {
        let {name} = pkg;

        if (result.suite) {
          name = `${name}.${result.suite.join(` `)}`;
        }

        name = `${name}.${browser.name
          .replace(/ /g, `_`)
          .replace(/\./g, `_`)}`;

        return name;
      },
      // function (browser, result) to customize the name attribute in xml
      // testcase element
      nameFormatter: undefined,
      // results will be saved as $outputDir/$browserName.xml
      outputDir: `reports/junit`,
      // if included, results will be saved as
      // $outputDir/$browserName/$outputFile
      outputFile: undefined,
      // key value pair of properties to add to the <properties> section of the
      // report
      properties: {},
      // suite will become the package name attribute in xml testsuite element
      suite: pkg.name,
      // add browser name to report and classes names
      useBrowserName: true,
      // use '1' if reporting to be per SonarQube 6.2 XML format
      xmlVersion: null
    },

    // level of logging
    // possible values:
    // - config.LOG_DISABLE
    // - config.LOG_ERROR
    // - config.LOG_WARN
    // - config.LOG_INFO
    // - config.LOG_DEBUG
    // logLevel: process.env.CI ? config.LOG_DISABLE : config.LOG_INFO,
    logLevel: config.LOG_DEBUG,
    // preprocess matching files before serving them to the browser
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': [
        `webpack`
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: process.env.CI ? [
      `junit`,
      `saucelabs`
    ] : [
      `mocha`
    ],

    sauceLabs: {
      build: process.env.CIRCLE_BUILD_NUM || `local-${process.env.USER}-${pkg.name}-${Date.now()}`,
      recordScreenshots: true,
      recordVide: true,
      tags: [
        process.env.CIRCLE_BRANCH,
        process.env.CIRCLE_JOB
      ],
      testName: pkg.name
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
