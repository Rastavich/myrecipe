// /* eslint-disable import/no-anonymous-default-export */
// import { NowRequest, NowResponse } from "@vercel/node";
// import { connectToDatabase } from '../../lib/database';
// var https = require('https');;

// export default async (req: NowRequest, res: NowResponse) => {
//     if (req.method === 'GET') {
//      const options = {
//         hostname: 'api.up.com.au',
//         path: '/api/v1/accounts',
//         Authorization: 'Bearer up:yeah:j9bfSpjgpnwvjFzawbgcvSRaNV77S07LeBwmt5eXrmga5JmiGK7cXjm6M8EkmLhKfIBwpZRc7mASr5GtBmhVlWjOV42iAYjsTnOUFffbYPSaPAoeGdhA5UxmaH66RglY',
//         method: 'GET'
//     }

//     var request = https.request(options, function(res) {
//         const data = res.JSON();
//         return data;
//     })

//     res.status(200).json(request);
// }
// }