import { openApiClient } from '../openapi-client';

export const SIGN_IN_REFRESH_TOKEN = async () => {
  const { data, error } = await openApiClient.GET(
    '/auth/sign-in/refresh-token',
    {
      credentials: 'include',
    },
  );
  if (error) {
    throw error;
  }
  return data;
};
