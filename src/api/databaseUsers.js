import { Api } from './config';

import { setToken, responseErrorHandler } from './interceptors';

class DatabaseUser extends Api {
  constructor() {
    super('https://vue-store-ad75d-default-rtdb.firebaseio.com/');
    this.request.interceptors.request.use(setToken);
    this.request.interceptors.response.use(undefined, responseErrorHandler);
  }

  async getCart(userID) {
    const resp = await this.request.get(`users/${userID}/cart.json`);
    return resp.data;
  }

  async setCart(userID, cart) {
    const resp = await this.request.put(`users/${userID}/cart.json`, cart);
    return resp.data;
  }

  async toOrder(userID, order) {
    const resp = await this.request.post(`users/${userID}/order.json`, order);
    if (resp.status === 200) this.request.delete(`users/${userID}/cart.json`);
    return resp.data;
  }

  async removeItem(userID, itemID) {
    const resp = await this.request.delete(`users/${userID}/cart/${itemID}.json`);
    return resp.data;
  }

  async editItem(userID, itemID, item) {
    const resp = await this.request.patch(`users/${userID}/cart/${itemID}.json`, item);
    return resp.data;
  }
}

export default new DatabaseUser();
