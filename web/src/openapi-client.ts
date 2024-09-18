import createClient from 'openapi-fetch';
import { paths } from './__generated__/schema';

export const openApiClien = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});
