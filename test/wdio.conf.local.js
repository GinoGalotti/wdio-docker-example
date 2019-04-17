const master = require("../wdio.conf");

exports.config = Object.assign(master.config, {
  baseUrl: 'https://www.planday.com',  
  specs: ["./test/specs/**/*.spec.js"],
  logLevel: 'error',
  reporterOptions: {
    outputDir: './logresults'
  },
  reporters: ["spec"],
  maxInstances: 2,
  capabilities: [
    {
      "browserName": "chrome",
      "goog:chromeOptions": {
        "args": ["disable-infobars"]
      }
    }
  ],
});
