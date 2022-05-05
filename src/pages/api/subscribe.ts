import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { stripe } from '../../services';

export default async function getUserById(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    const session = await getSession({ req: request });

    const stripeCustomer = await stripe.customers.create({
      email: session?.user?.email ?? '',
    });

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: 'price_1KnWptGkw9LK4xGQkuf4lD5c',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: 'https://localhost:300/posts',
      cancel_url: 'https://localhost:3000/',
    });
    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    request.setHeader('Allow', 'POST');
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
