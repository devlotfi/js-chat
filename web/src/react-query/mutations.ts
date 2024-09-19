import { paths } from '../__generated__/schema';
import { openApiClient } from '../openapi-client';

export const SIGN_IN = async (
  body: paths['/auth/sign-in']['post']['requestBody']['content']['application/json'],
) => {
  const { data, error } = await openApiClient.POST('/auth/sign-in', {
    body,
    credentials: 'include',
  });
  if (error) {
    throw error;
  }
  return data;
};

export const SIGN_OUT = async () => {
  const { data, error } = await openApiClient.POST('/auth/sign-out', {
    credentials: 'include',
  });
  if (error) {
    throw error;
  }
  return data;
};
