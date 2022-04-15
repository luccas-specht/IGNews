import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components';
import { stripe } from '../services';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const PRICE_ID = 'price_1KnWptGkw9LK4xGQkuf4lD5c';

  const { id, unit_amount } = await stripe.prices.retrieve(PRICE_ID, {
    expand: ['product'],
  });

  const product = {
    priceId: id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(unit_amount) / 100),
  };

  return {
    props: {
      product,
    },
  };
};
