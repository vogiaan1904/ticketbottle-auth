import { betterAuth } from 'better-auth';
import config from '@/config/index.js';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@/generated/prisma';
const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      name: {
        type: 'string',
        required: true,
      },
      phone: {
        type: 'string',
        required: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      mapProfileToUser: (profile) => {
        return {
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
        };
      },
    },
  },
  secret: config.betterAuthSecret,
});
