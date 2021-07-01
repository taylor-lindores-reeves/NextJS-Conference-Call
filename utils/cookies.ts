import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiResponse } from "next";

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value?: string,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};
