import axios from 'axios';

const apiKey = 'AIzaSyDoMeHm1iBnf1yBPHlHaHBcp9fnV8wKVkY';

class Api {
  constructor(baseURL) {
    this.request = axios.create({
      baseURL,
      timeout: 5000,
    });
  }
}

export { apiKey, Api };
