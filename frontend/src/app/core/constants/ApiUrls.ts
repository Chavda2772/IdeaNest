const _baseApi = 'http://localhost:3000';

// APIS
export const ApiEndpoints = {
  BaseApi: _baseApi,
  Auth: {
    Login: '/api/user/login',
    Register: '/api/user/register',
    GetDetails: '/api/user/getDetails',
  },
  Collection: {
    Get: '/api/collection'
  },
  NestItems: {
    Add: '/api/items',
  },
};
