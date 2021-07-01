// pages/api/cookies.ts

import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "../../utils/cookies";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Calling our pure function using the `res` object, it will add the `set-cookie` header

  const token = process.env.JWT_TOKEN;

  const options = { expires: new Date(Date.now() + 99999), httpOnly: false };

  setCookie(res, "jwt", token, options);

  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  res.end(res.getHeader("Set-Cookie"));
};

export default handler;
