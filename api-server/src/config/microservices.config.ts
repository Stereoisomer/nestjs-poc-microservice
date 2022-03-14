import { registerAs } from '@nestjs/config';

export default registerAs('microservices', () => {
  return {
    instruments: {
      host: process.env.INSTRUMENTS_SERVICE_HOST || 'localhost',
      port: process.env.INSTRUMENTS_SERVICE_PORT || 3001,
    },
    quote: {
      host: process.env.QUOTE_SERVICE_HOST || 'localhost',
      port: process.env.QUOTE_SERVICE_PORT || 3002,
    },
    users: {
      host: process.env.USERS_SERVICE_HOST || 'localhost',
      port: process.env.USERS_SERVICE_PORT || 3003,
    },
  };
});
