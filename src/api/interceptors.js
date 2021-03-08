import axios from 'axios';
import store from '@/store';
import { apiKey } from './config';

async function updateToken() {
  const resp = await axios.post(
    `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
    {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refreshToken'),
    }
  );
  localStorage.setItem('token', resp.data.id_token);
  localStorage.setItem('refreshToken', resp.data.refresh_token);
}

export function setToken(config) {
  const editConfig = config;
  editConfig.params = { auth: localStorage.getItem('token') };
  return editConfig;
}

export async function responseErrorHandler(error) {
  if (error.response?.status === 401 && localStorage.getItem('refreshToken')) {
    try {
      await updateToken();
      const resp = await axios(setToken(error.config));
      return resp;
    } catch (newError) {
      store.dispatch('user/logOut');
      throw error;
    }
  } else if (
    error.response?.data?.error?.message === 'INVALID_ID_TOKEN' &&
    localStorage.getItem('refreshToken')
  ) {
    try {
      await updateToken();
      const resp = await axios({
        ...error.config,
        data: { ...error.config.data, idToken: localStorage.getItem('token') },
      });
      return resp;
    } catch (newError) {
      store.dispatch('user/logOut');
      throw error;
    }
  }
  throw error;
}
