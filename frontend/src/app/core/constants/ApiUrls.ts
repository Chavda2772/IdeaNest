import { environment } from "../../../environments/environment";

const _baseApi = environment.baseUrl;

// APIS
export const ApiEndpoints = {
  BaseApi: _baseApi,
  Auth: {
    Login: '/api/user/login',
    Register: '/api/user/register',
    GetDetails: '/api/user/getDetails',
  },
  Collection: {
    Get: '/api/collection',
    Add: '/api/collection'
  },
  NestItems: {
    Add: '/api/items',
  },
};
