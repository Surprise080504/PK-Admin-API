const { store } = require('../middlewares');
const controller = require('../controllers/upload.controller');

module.exports = function (app) {
  app.post('/api/upload/image', store.array('images', 12), controller.uploadImage);
  app.get('/api/file/image/:imageName', controller.getImage);
};
