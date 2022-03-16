const { authJwt } = require('../middlewares');
const controller = require('../controllers/friends.controller');

module.exports = function (app) {
  app.post('/api/friend', [authJwt.verifyToken], controller.newFriend);
  app.get('/api/friend/:userId', [authJwt.verifyToken], controller.getFriends);
};
