const {By} = require('selenium-webdriver');

const devLogin = async (loginLink, driver) => {
    // one time login link fails 50% of the time for some reason
    await driver.get(loginLink);
    if (await driver.getCurrentUrl() === 'http://localhost:8081/user/password') {
        await driver.quit();
        throw new Error('One time login failed');
    }
};

const nonDevLogin = async (driver) => {
    await driver.get(process.env.uri);
    let user = process.env.loginUser;
    let pass = process.env.loginPassword;
    if (user === undefined || pass === undefined) {
        throw new Error('Undefined env variables loginUser and/or loginPassword');
    }
    let userInput = await driver.findElement(By.css('#edit-name'));
    await userInput.sendKeys(user);
    let passwordInput = await driver.findElement(By.css('#edit-pass'));
    await passwordInput.sendKeys(pass);
    let loginButton = await driver.findElement(By.css('#edit-submit'));
    await loginButton.click();
};

exports.devLogin = devLogin;
exports.nonDevLogin = nonDevLogin;
