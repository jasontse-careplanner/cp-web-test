const { By } = require('selenium-webdriver');
const assert = require('chai').assert;

const hasActiveCarePlan = async (driver, fileName, fileSize, message) => {
    let fileSizeSpan = await driver.findElement(By.xpath("//span[text()='File size:']"));
    let fileSizeActual = await fileSizeSpan.findElement(By.xpath("./..")).getText();
    let fileSizeExpected = 'File size: ' + fileSize
    await assert.equal(fileSizeActual, fileSizeExpected, 'Active Care Plan filesize incorrect.');

    let messageP = await driver.findElement(By.xpath("//p[text()='Summary message to carers:']"));
    let messageActual = await messageP.findElement(By.xpath("./..")).getText();
    let messageExpected = 'Summary message to carers:\n' + message
    await assert.equal(messageActual, messageExpected, 'Active Care Plan message incorrect.');

    let activeCarePlanH = await driver.findElement(By.xpath("//h2[text()='Active Care Plan']"));
    let nameActual = await activeCarePlanH.findElement(By.xpath("./../../div[2]/div[1]/div/div[1]/p")).getText();
    await assert.equal(nameActual, fileName, 'Active Care Plan name incorrect.');
};

const hasNoActiveCarePlan = async (driver) => {
    driver.findElement(
        By.xpath("//p[text()='No active care plan for this client.']")
    );
};

const expiredCarePlansHasXRecords = async (driver, number) => {
    if (number === 0) {
        let expiredCarePlan = await driver.findElement(
            By.xpath("//p[text()='No expired care plans for this client.']/..")
        );
    } else {
        let expiredCarePlansTable = await driver.findElement(By.xpath("//div[text()='Document name:']/.."));
        let divChildren = await expiredCarePlansTable.findElements(By.xpath("./div"));
        let expiredCarePlanSizeActual = divChildren.length - 5;
        await assert.equal(expiredCarePlanSizeActual, number, 'Expired Care Plan total records incorrect.');
    }
};

exports.hasActiveCarePlan = hasActiveCarePlan;
exports.hasNoActiveCarePlan = hasNoActiveCarePlan;
exports.expiredCarePlansHasXRecords = expiredCarePlansHasXRecords;
