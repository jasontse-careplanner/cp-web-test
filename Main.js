const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
const fs = require('fs');
const generateOneTimeLogin = require('./Utility/GenerateOneTimeLogin');
const login = require('./Utility/Login');
require('dotenv').config();
let opts = new chrome.Options();

let isHeadless = false;
let isDev = false;
process.argv.forEach(function (val, index, array) {
  if (val === '--headless') {
    isHeadless = true;
  }
  if (val === '--dev') {
    isDev = true;
  }
});

let testToRun = process.argv[2];
if (!fs.existsSync('Test/' + testToRun + '.js')) {
  throw new Error('Test does not exist');
}
let test = require('./Test/' + testToRun);

(async function main() {
  let driver;
  if (!isHeadless) {
    driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions()
        .build();
  } else {
    driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts.headless())
        .build();
  }
  await driver.manage().window().setRect({ width: 1366, height: 768 });
  if (isDev) {
    let link = await generateOneTimeLogin.generateLink();
    await login.devLogin(link, driver);
  } else {
    await login.nonDevLogin(driver);
  }
  await test.test(driver);

  if (!isDev) {
    await driver.quit();
  }
})();
