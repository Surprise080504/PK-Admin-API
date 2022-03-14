const { getFirestore, getDoc, doc, updateDoc } = require('firebase/firestore');
const firebaseApp = require('../helpers/firebase');

class FirebaseApiService {
  constructor() {
    this._db = getFirestore(firebaseApp);
  }

  async getShopifyKeys() {
    const docRef = doc(this._db, 'keys', 'shopify');
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async saveShopifyKeys(shopifyKeys) {
    const docRef = doc(this._db, 'keys', 'shopify');
    await updateDoc(docRef, shopifyKeys);
  }
}

module.exports = FirebaseApiService;
