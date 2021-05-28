const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
const oneTimeLogin = require('./Utility/OneTimeLogin');
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
    let link = await oneTimeLogin.login();
    await devLogin(link, driver);
  } else {
    await nonDevLogin(driver);
  }
  await test(driver);
})();

// todo: Set up public git repo and push to it

async function devLogin(loginLink, driver) {
  // todo: figure out why one time login code fails 50% of the time
  await driver.get(loginLink);
  if (await driver.getCurrentUrl() === 'http://localhost:8081/user/password') {
    await driver.quit();
    throw new Error('One time login failed');
  }
}

async function nonDevLogin(driver) {
  let user = process.env.loginUser;
  let pass = process.env.loginPassword;
  if (user === undefined || pass === undefined) {
    throw new Error('Undefined env variables loginUser and/or loginPassword');
  }
  // todo: nonDev login with admin user
}

async function test(driver) {
  let clientsElement = await driver.findElement(webdriver.By.css('.menu-176'));
  await clientsElement.click();

  // todo: create new user
  // todo: create care plan
  // todo: create second care plan
  // todo: check old care plan pushed to expired
  // todo: check active care plan is the most recent care plan created


  // let userInput = driver.findElement(webdriver.By.css('#edit-name'));
  // userInput.sendKeys('asdfasdfsafdasdf');

  if (!isDev) {
    await driver.quit();
  }
}