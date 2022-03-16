const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.post('/api/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
  app.post('/api/auth/signin', controller.signin);
};
