const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
let opts = new chrome.Options();

(async function main() {
    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions()
        .build();

    await driver.get('http://www.google.com');
    await driver.manage().window().setRect({ width: 1366, height: 768 });
    await driver.get('http://localhost:8081/');
    let userInput = driver.findElement(webdriver.By.css('#edit-name'));
    userInput.sendKeys('asdfasdfsafdasdf');

    // await driver.quit();
})();
