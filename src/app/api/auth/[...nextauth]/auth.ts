import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginResponse } from './lib/types/auth';
LoginResponse
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
        rememberMe: {}, // Add rememberMe to credentials
      },
      authorize: async credentials => {
        const response = await fetch(
          `${process.env.API_URL}/auth/signin`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const payload: APIResponse<LoginResponse> =
          await response.json();

        if ('error' in payload) {
          throw new Error(payload.error);
        }

        return {
          id: payload.user._id,
          accessToken: payload.token,
          user: payload.user,
          rememberMe: credentials?.rememberMe === 'true', // Convert to boolean
        };
      },
    }),
  ],

  callbacks: {
    // Called when JWT token is created or updated
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
        token.rememberMe = user.rememberMe; // Store rememberMe in token
      }
      return token;
    },

    // Called when session is created
    session: async ({ session, token }) => {
      session.user = token.user;

      // If rememberMe is false, expire session immediately (session-only)
      if (token.rememberMe === false) {
        session.expires = new Date(0).toISOString();
      }

      return session;
    },
  },
};
