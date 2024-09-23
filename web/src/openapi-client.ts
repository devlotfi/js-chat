import createFetchClient, { Middleware } from 'openapi-fetch';
import { paths } from './__generated__/schema';
import createClient from 'openapi-react-query';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export class InMemoryStore {
  private static _accessToken?: string | undefined;
  public static get accessToken(): string | undefined {
    return InMemoryStore._accessToken;
  }
  public static set accessToken(value: string | undefined) {
    InMemoryStore._accessToken = value;
  }
}

export const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});

const authMiddelware: Middleware = {
  async onRequest({ request }) {
    let accessToken = InMemoryStore.accessToken;
    console.log(JSON.stringify(accessToken));

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
        baseURL: import.meta.env.VITE_API_URL,
      });

      InMemoryStore.accessToken = data.accessToken;
      accessToken = data.accessToken;
    }
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  },
};

fetchClient.use(authMiddelware);

export const $api = createClient(fetchClient);
