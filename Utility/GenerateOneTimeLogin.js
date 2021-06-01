const { exec } = require('child_process');
const util = require("util");
const execProm = util.promisify(exec);

const generateLink = async () => {
    let result;
    let link = '';
    try {
        result = await execProm('docker exec careplanner_careplanner_1 drush uli');
    } catch(ex) {
        throw new Error(ex);
    }
    link = (result.stdout).replace('http://default', 'http://localhost:8081');
    return link;
};

exports.generateLink = generateLink;
