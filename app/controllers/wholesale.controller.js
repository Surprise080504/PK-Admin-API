const FirebaseApiService = require('../services/firebase-api-service');
const ShopifyApiService = require('../services/shopify-api-service');

const firebaseApiService = new FirebaseApiService();

exports.getProducts = async (req, res) => {
  try {
    const shopifyKeys = await firebaseApiService.getShopifyKeys();
    const shopifyApiService = new ShopifyApiService(shopifyKeys.adminAccessToken);
    const products = await shopifyApiService.getProducts();
    res.json({ products });
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const shopifyKeys = await firebaseApiService.getShopifyKeys();
    const shopifyApiService = new ShopifyApiService(shopifyKeys.adminAccessToken);
    const orders = await shopifyApiService.getOrders();
    res.json({ orders });
  } catch (err) {
    console.log(err);
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const shopifyKeys = await firebaseApiService.getShopifyKeys();
    const shopifyApiService = new ShopifyApiService(shopifyKeys.adminAccessToken);
    const customers = await shopifyApiService.getCustomers();
    res.json({ customers });
  } catch (err) {
    console.log(err);
  }
};
