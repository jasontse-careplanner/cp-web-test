const createNewClient = require('../Utility/CreateNewClient');
const uploadCarePlan = require('../Utility/UploadCarePlan');
const expireCarePlan = require('../Utility/ExpireCarePlan');

const test = async (driver) => {
    await createNewClient.createNewClient(driver);
    await uploadCarePlan.uploadCarePlan(driver, 'test.pdf', 'message');
    await expireCarePlan.expireCarePlan(driver);
    await uploadCarePlan.uploadCarePlan(driver, 'test.doc', 'message2');

// todo: upload file with browse button
    // todo: create care plan
    // todo: create second care plan
    // todo: check old care plan pushed to expired
    // todo: check active care plan is the most recent care plan created
};

exports.test = test;
