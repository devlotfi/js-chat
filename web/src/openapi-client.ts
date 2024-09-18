import createClient from 'openapi-fetch';
import { paths } from './__generated__/schema';

export const openApiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});
