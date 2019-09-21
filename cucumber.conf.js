const fs = require('fs');
const path = require('path');
const { setDefaultTimeout, After, AfterAll, BeforeAll, Before } = require('cucumber');
const {createSession,closeSession,startWebDriver,stopWebDriver,getNewScreenshots} = require('nightwatch-api');
const reporter = require('cucumber-html-reporter');

setDefaultTimeout(120000);

BeforeAll(async () => {
  await startWebDriver();
});

AfterAll(async () => {
  await stopWebDriver();
  setTimeout(() => {
    reporter.generate({
      theme: 'bootstrap',
      jsonFile: 'report/cucumber_report.json',
      output: 'report/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
      metadata: {
        'App Version': '0.3.2',
        'Test Environment': 'POC'
      }
    });
  }, 1000);
});

Before(async () => {
    await createSession();
});

After(async () => {
    await closeSession();
});

After(function() {
  getNewScreenshots().forEach(file => this.attach(fs.readFileSync(file), 'image/png'));
});