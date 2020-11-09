import { NowRequest, NowResponse } from "@vercel/node";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NowRequest, res: NowResponse) => {
  return res.json({ message: "Hello World" });
};

// const faunadb = require("faunadb");

// // your secret hash
// const secret = process.env.FAUNADB_SECRET_KEY;
// const q = faunadb.query;
// const client = new faunadb.Client({ secret });

// module.exports = async (req, res) => {
//   try {
//     const dbs = await client.query(
//       q.Map(
//         // iterate each item in result
//         q.Paginate(
//           // make paginatable
//           q.Match(
//             // query index
//             q.Index("all_recipes") // specify source
//           )
//         ),
//         (ref) => q.Get(ref) // lookup each result by its reference
//       )
//     );
//     // ok
//     res.status(200).json(dbs.data);
//   } catch (e) {
//     // something went wrong
//     console.log("test");
//     res.status(500).json({ error: e.message });
//   }
// };
