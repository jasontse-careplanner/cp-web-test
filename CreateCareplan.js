const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
const oneTimeLogin = require('./Utility/OneTimeLogin');
let opts = new chrome.Options();

let appUsername = 'admin';
let appPassword = '@smmsdjh@S';

let isHeadless = process.argv[2] === '--headless';

// oneTimeLogin.login().then( res => devTest(res) );
(async function main() {
  oneTimeLogin.login().then( res => devTest(res) );
})();

async function devTest(loginLink) {
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

  await driver.get(loginLink);
  await driver.manage().window().setRect({ width: 1366, height: 768 });
  let clientsElement = await driver.findElement(webdriver.By.css('.menu-176'));
  await clientsElement.click();

  // let userInput = driver.findElement(webdriver.By.css('#edit-name'));
  // userInput.sendKeys('asdfasdfsafdasdf');

  await driver.quit();
}