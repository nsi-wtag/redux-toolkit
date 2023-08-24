import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
   baseUrl: 'http://localhost:3500',
   credentials: 'include',
   prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
         headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
   }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions);

   if (result?.origianlStatus === 403) {
      console.log('Sending refresh token');
      const refreshResult = await baseQuery('/refresh', api, extraOptions);
      console.log(refreshResult);

      if (refreshResult?.data) {
         const user = api.getState().auth.user;

         api.dispatch(setCredentials({ ...refreshResult.token, user }));

         result = await baseQuery(args, api, extraOptions);
      } else {
         api.dispatch(logOut());
      }
   }

   return result;
};

export const authSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: (builder) => ({})
});
