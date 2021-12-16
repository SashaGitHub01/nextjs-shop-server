import crypto from 'crypto';

export const generateHash = (val) => {
   return crypto.createHash('md5').update(val + process.env.SECRET_KEY).digest('hex');
}