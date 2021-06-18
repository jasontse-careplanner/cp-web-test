const { By, until } = require('selenium-webdriver');

const expireCarePlan = async (driver) => {
    let expireButton = await driver.findElement(By.xpath("//button[text()='Expire']"));
    await expireButton.click();

    let saveButton = await driver.findElement(By.xpath("//button[text()='Save']"));
    await saveButton.click();

    // wait until modal closed
    await driver.wait((until.stalenessOf(saveButton)), 60000, 'saveButton is still visible.');
};

exports.expireCarePlan = expireCarePlan;
