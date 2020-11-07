import { NowRequest, NowResponse } from "@vercel/node";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NowRequest, res: NowResponse) => {
  return res.json({ message: "Hello World" });
};