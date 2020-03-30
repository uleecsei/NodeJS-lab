const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant('shipper')
      .readOwn('profile')
      .updateOwn('profile');

  ac.grant('driver')
      .readOwn('profile')
      .updateOwn('profile');

  return ac;
})();
