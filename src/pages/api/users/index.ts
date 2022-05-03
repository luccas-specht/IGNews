import { NextApiRequest, NextApiResponse } from 'next';

// environment variables are ables only API Routes, getServerSideProps and getStaticProps.

/* 
  API Roues are: Serverless.
  
  ?? But bro, what's means Serverless ??

  When it does the deployment, there isn't any server like express or nodejs. 
  Serverless doesn't need a server for 24h running all time.
  then, for each request, it's gonna does a new server a "virtual machine" and when it's gonna return a response it stop.

*/

/* 
  Ways to do auth on Next:
  1 - (Classic) JWT  
  2 - Next.js (Social, Google, Facebook, Twitter, etc)
  3 - Firebase, Cognito, Auth0, etc
*/

// access this on: localhost:3000/api/users
export default function getUsers(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Gui enriconi' },
    { id: 3, name: 'Lukinhas ppt' },
  ];

  return response.json(users);
}
