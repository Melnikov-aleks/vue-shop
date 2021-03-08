import { apiKey, Api } from './config';

import { responseErrorHandler } from './interceptors';

class Auth extends Api {
  constructor() {
    super('https://identitytoolkit.googleapis.com/');
    this.request.interceptors.response.use(undefined, responseErrorHandler);
  }

  async register(email, password) {
    const resp = await this.request.post(`v1/accounts:signUp?key=${apiKey}`, {
      email,
      password,
      returnSecureToken: true,
    });
    return resp.data;
  }

  async login(email, password) {
    const resp = await this.request.post(`v1/accounts:signInWithPassword?key=${apiKey}`, {
      email,
      password,
      returnSecureToken: true,
    });
    return resp.data;
  }

  async getUserByToken(token) {
    const resp = await this.request.post(`v1/accounts:lookup?key=${apiKey}`, {
      idToken: token,
    });
    return resp.data.users[0];
  }
}

export default new Auth();
