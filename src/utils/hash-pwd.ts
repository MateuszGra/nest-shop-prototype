import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac(
        'sha512',
        'HgduahduHHHBduashduay33333213788888888888ssssskjadkahduhqwuidhwuehuiwheuiwhudnwudbsdhascmNNNNJkOIWH##');
    hmac.update(p);
    return hmac.digest('hex');
};