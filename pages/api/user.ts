// pages/api/user.ts

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // picks up the cookie and checks if exists

  const jwt = req.cookies.jwt;
  if (req.method === "GET" && jwt) {
    // gets the user's data by passing jwt token and sends back to frontend
    const user = await fetch(
      "https://golf.devpartners.co.uk/production/api/member/getMember",
      {
        method: "POST",
        headers: { jwt }
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.payload.member;
      });

    res.status(200).json(user);
  } else {
    res.status(401).end();
  }
};

export default handler;
