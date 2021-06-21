const { By, Key, until } = require('selenium-webdriver');

const uploadCarePlan = async (driver, fileToUpload, message) => {
    let carePlansElement = await driver.findElement(By.linkText('Care Plans'));
    await carePlansElement.click();
    let uploadButton = await driver.findElement(By.xpath("//button[text()='Upload']"));
    await uploadButton.click();

    let browse = await driver.findElement(By.xpath("//input[@name='carePlan']"));
    await browse.sendKeys(process.cwd() + '/Files/' + fileToUpload)

    let assessedByElement = await driver.findElement(By.xpath("//label[text()='Assessed By']"));
    await assessedByElement.click();
    await driver.actions().sendKeys(Key.DOWN, Key.ENTER).perform();

    let summaryCheckbox = await driver.findElement(By.css('#summary'));
    await summaryCheckbox.click();
    let messageTextBox = await driver.findElement(By.name('message'));
    await messageTextBox.sendKeys(message);

    let saveButton = await driver.findElement(By.xpath("//button[text()='Save']"));
    await driver.wait((until.elementIsEnabled(saveButton)), 60000, 'saveButton is not enabled');
    await saveButton.click();
};

exports.uploadCarePlan = uploadCarePlan;
