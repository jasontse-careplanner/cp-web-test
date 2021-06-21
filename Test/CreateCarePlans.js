const createNewClient = require('../Utility/CreateNewClient');
const uploadCarePlan = require('../Utility/CarePlan/UploadCarePlan');
const expireCarePlan = require('../Utility/CarePlan/ExpireCarePlan');
const assert = require('../Utility/CarePlan/Assert');

const test = async (driver) => {
    await createNewClient.createNewClient(driver);
    await uploadCarePlan.uploadCarePlan(driver, 'test.pdf', 'message');
    await assert.hasActiveCarePlan(driver, 'test.pdf', '106.3K', 'message');
    await assert.expiredCarePlansHasXRecords(driver, 0);

    await expireCarePlan.expireCarePlan(driver);
    await assert.hasNoActiveCarePlan(driver);
    await assert.expiredCarePlansHasXRecords(driver, 1);

    await uploadCarePlan.uploadCarePlan(driver, 'test.doc', 'message2');
    await assert.hasActiveCarePlan(driver, 'test.doc', '9.22K', 'message2');
    await assert.expiredCarePlansHasXRecords(driver, 1);
};

exports.test = test;
