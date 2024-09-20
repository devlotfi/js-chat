import createFetchClient, { Middleware } from 'openapi-fetch';
import { paths } from './__generated__/schema';
import createClient from 'openapi-react-query';
import { Constants } from './constants';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});

const authMiddelware: Middleware = {
  async onRequest({ request }) {
    let accessToken = sessionStorage.getItem(
      Constants.ACCESS_TOKEN_STORAGE_KEY,
    );
    console.log('mid');

    if (!accessToken) {
      return;
    }
    console.log('check');
    let expired = false;
    const decoded = jwtDecode(accessToken);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = decoded.exp;

    const timeRemaining = expirationTimestamp
      ? expirationTimestamp - currentTimestamp
      : 0;
    expired = timeRemaining <= 30;

    if (expired) {
      console.log('renew');

      const { data } = await axios.get<
        paths['/auth/sign-in/refresh-token']['get']['responses']['200']['content']['application/json']
      >('/auth/sign-in/refresh-token', {
        withCredentials: true,
      });

      sessionStorage.setItem(
        Constants.ACCESS_TOKEN_STORAGE_KEY,
        data.accessToken,
      );
      accessToken = data.accessToken;
    }
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  },
};

fetchClient.use(authMiddelware);

export const $api = createClient(fetchClient);
