const FirebaseApiService = require('../services/firebase-api-service');

const firebaseApiService = new FirebaseApiService();

exports.getShopifyKeys = async (req, res) => {
  try {
    const shopifyKeys = await firebaseApiService.getShopifyKeys();
    res.json({ shopifyKeys });
  } catch (err) {
    console.log(err);
  }
};
