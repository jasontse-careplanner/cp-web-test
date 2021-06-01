const devLogin = async (loginLink, driver) => {
    // todo: figure out why one time login code fails 50% of the time
    await driver.get(loginLink);
    if (await driver.getCurrentUrl() === 'http://localhost:8081/user/password') {
        await driver.quit();
        throw new Error('One time login failed');
    }
};

const nonDevLogin = async (driver) => {
    let user = process.env.loginUser;
    let pass = process.env.loginPassword;
    if (user === undefined || pass === undefined) {
        throw new Error('Undefined env variables loginUser and/or loginPassword');
    }
    // todo: nonDev login with admin user
};

exports.devLogin = devLogin;
exports.nonDevLogin = nonDevLogin;
