import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => {
  const host = process.env.MONGODB_HOST || '127.0.0.1'; // cannot use 'localhost'
  const port = process.env.MONGODB_PORT || "27017";
  const dbName = process.env.MONGODB_DBNAME || 'example';

  const uri = "mongodb://".concat(host, ":", port, "/", dbName);

  return { host, port, dbName, uri };
});
