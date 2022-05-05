import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { query as q } from 'faunadb';

import { fauna, stripe } from '../../services';

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async function getUserById(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    const session = await getSession({ req: request });

    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(String(session?.user?.email))
        )
      )
    );

    let customerId = user.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session?.user?.email ?? '',
      });

      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: {
            stripe_customer_id: customerId,
          },
        })
      );

      customerId = stripeCustomer.id;
    }

    const { id } = await stripe.checkout.sessions.create({
      customer: customerId,
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

    return response.status(200).json({ sessionId: id });
  } else {
    request.setHeader('Allow', 'POST');
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
