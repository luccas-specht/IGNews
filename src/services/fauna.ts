import { Client } from 'faunadb';

/* 
  operations on database can't be done in the same file as the client.
  Only api routes or getStaticProps and getServerSideProps can be done in the same file.
*/

export const fauna = new Client({
  secret: String(process.env.FAUNA_DB_KEY),
});
