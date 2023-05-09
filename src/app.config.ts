import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => {
  const { PORT, NODE_ENV, CLIENT_HOST } = process.env;

  return {
    isDev: NODE_ENV !== 'production',
    port: parseInt(PORT, 10) || 3000,
    clientHost: CLIENT_HOST,
  } as const;
});
