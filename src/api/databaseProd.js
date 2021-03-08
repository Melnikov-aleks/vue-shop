import { Api } from './config';

class DatabaseProducts extends Api {
  constructor() {
    super('https://vue-store-ad75d-default-rtdb.firebaseio.com/');
  }

  async getCategories() {
    const resp = await this.request.get(`categories.json`);
    return resp.data;
  }

  async getProducts(category = null) {
    let filter = '';
    if (category) filter += `?orderBy="category"&equalTo="${category}"`;
    const resp = await this.request.get(`products.json${filter}`);
    return resp.data;
  }

  async getProduct(id) {
    const resp = await this.request.get(`products/${id}.json`);
    return resp.data;
  }
}

export default new DatabaseProducts();
