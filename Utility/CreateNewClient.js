const webdriver = require('selenium-webdriver');

const createNewClient = async (driver) => {
    let forename = 'FORENAME' + Date.now();
    let surname = 'SURNAME' + Date.now();

    let clientsElement = await driver.findElement(webdriver.By.linkText('Clients'));
    await clientsElement.click();
    let addClientButton = await driver.findElement(webdriver.By.linkText('Add new client'));
    await addClientButton.click();
    let forenameInput = await driver.findElement(webdriver.By.css('#edit-profile-forename'));
    await forenameInput.sendKeys(forename);
    let surnameInput = await driver.findElement(webdriver.By.css('#edit-profile-surname'));
    await surnameInput.sendKeys(surname);
    let addressInput = await driver.findElement(webdriver.By.css('#edit-profile-address'));
    await addressInput.sendKeys('123');
    let regions = await driver.findElements(webdriver.By.css('.form-type-checkbox'));
    await regions[0].click();
    let saveButton = await driver.findElement(webdriver.By.css('#edit-user-save'));
    await saveButton.click();
};

exports.createNewClient = createNewClient;
