const { Shopify } = require('@shopify/shopify-api');

class ShopifyApiService {
  constructor(accessToken) {
    this._client = new Shopify.Clients.Rest('purekanawholesale.myshopify.com', accessToken);
  }

  async getProducts() {
    const products = await this._client.get({
      path: 'products',
    });

    return products.body.products;
  }

  async getOrders() {
    const orders = await this._client.get({
      path: 'orders',
      query: { status: 'any' },
    });

    return orders.body.orders;
  }

  async getCustomers() {
    const customers = await this._client.get({
      path: 'customers',
      query: { limit: 250 },
    });

    return customers.body.customers;
  }
}

module.exports = ShopifyApiService;
