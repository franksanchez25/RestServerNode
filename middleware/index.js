
const  validateToken = require('../middleware/validateToken');
const  isAdminRole = require('../middleware/validateRole');
const  haveRole = require('../middleware/validateRole');



module.exports = {
    ...validateToken,
    ...isAdminRole,
    ...haveRole
}