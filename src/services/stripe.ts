import Stripe from 'stripe';

import pack from '../../package.json';

// TODO: add stripe secret key to .env
const randomKey =
  'sk_test_51KnWlOGkw9LK4xGQI65WGbfGLoaab6Nqtaqwo7RgqIoqow8OjxZ3sQmZZTA8R4YY5YEph8cVXwvCgfzlhLnXwSOS00gTjVTv8M';

export const stripe = new Stripe(randomKey, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'Ignews',
    version: pack.version,
  },
});
