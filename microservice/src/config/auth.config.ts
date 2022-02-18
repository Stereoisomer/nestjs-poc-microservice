import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  const jwtSecret = process.env.JWT_SECRET_KEY;
  const ivSize = process.env.IV_SIZE;
  const cipherKey = process.env.CIPHER_KEY;

  return { 'jwt.secret': jwtSecret, 'key.value': cipherKey, 'key.iv': ivSize };
});
