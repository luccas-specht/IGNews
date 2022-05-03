import { NextApiRequest, NextApiResponse } from 'next';

/* 
  path folder: 
    src
    -- pages
      -- api
        -- users
          -- [id].ts

the query contents one param: the id 

const id = request.query.id;
*/

export default function getUserById(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const {
    query: { id },
  } = request;

  // look it on terminal
  console.log(id);

  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Gui enriconi' },
    { id: 3, name: 'Lukinhas ppt' },
  ];

  return response.json(users);
}
