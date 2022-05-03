import { NextApiRequest, NextApiResponse } from 'next';

/* 
  path folder: 
    src
    -- pages
      -- api
        -- users
          -- [...params].tsx

All the parameters after `/users` will be passed as an array variable called params

const params = request.query.params

params: [ 'edit', '1', 'banana' ]

log it
console.log(params);
*/

export default function getUserById(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const {
    query: { params },
  } = request;

  console.log(params);

  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Gui enriconi' },
    { id: 3, name: 'Lukinhas ppt' },
  ];

  return response.json(users);
}
