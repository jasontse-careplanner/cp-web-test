const webdriver = require('selenium-webdriver');

const test = async (driver) => {
    let clientsElement = await driver.findElement(webdriver.By.css('.menu-176'));
    await clientsElement.click();

    // todo: create new user
    // todo: create care plan
    // todo: create second care plan
    // todo: check old care plan pushed to expired
    // todo: check active care plan is the most recent care plan created


    // let userInput = driver.findElement(webdriver.By.css('#edit-name'));
    // userInput.sendKeys('asdfasdfsafdasdf');
};

exports.test = test;
