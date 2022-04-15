import { GetServerSideProps, GetStaticProps } from 'next';
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

/* 
  there are 3 ways to get data from nextjs:
  1. client side: we don't need indexation and it needs action from user. For example all actions after that page was loaded and we don't need them before.
  2. server side: we need indexation too like SSG, but dynamic first related to user session. For example, real time information about user, requests contexts and etc... 
  3. static: generate static files and share them with everyone. For example, home blog, post blog, products into e-commerce site and etc...
*/

export default function Home({ product }: HomeProps) {
  const { priceId, amount } = product;

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
            <span>for {amount} month</span>
          </p>
          <SubscribeButton priceId={priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

/* export const getServerSideProps: GetServerSideProps = async () => {
  const PRICE_ID = 'price_1KnWptGkw9LK4xGQkuf4lD5c';

  const { id, unit_amount } = await stripe.prices.retrieve(PRICE_ID);

   
  -- if you want to get the full product object, you can use the following:
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
}; */

// for this way this one is better than the above one
export const getStaticProps: GetStaticProps = async () => {
  const PRICE_ID = 'price_1KnWptGkw9LK4xGQkuf4lD5c';

  const twentyFourHoursInSeconds = 24 * 60 * 60;

  const { id, unit_amount } = await stripe.prices.retrieve(PRICE_ID);

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
    revalidate: twentyFourHoursInSeconds,
  };
};
