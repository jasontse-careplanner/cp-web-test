const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
const oneTimeLogin = require('./Utility/OneTimeLogin');
let opts = new chrome.Options();

let appUsername = 'admin';
let appPassword = '@smmsdjh@S';

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

async function devLogin(loginLink, driver) {
  await driver.get(loginLink);
  if (await driver.getCurrentUrl() === 'http://localhost:8081/user/password') {
    await driver.quit();
    throw new Error('One time login failed');
  }
}

async function nonDevLogin(driver) {
  // todo: nonDev login with admin user
}

async function test(driver) {
  let clientsElement = await driver.findElement(webdriver.By.css('.menu-176'));
  await clientsElement.click();

  // todo: create new user


  // let userInput = driver.findElement(webdriver.By.css('#edit-name'));
  // userInput.sendKeys('asdfasdfsafdasdf');

  if (!isDev) {
    await driver.quit();
  }
}