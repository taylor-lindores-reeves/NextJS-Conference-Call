import express, { Express } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socket from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const cookieParser = require("cookie-parser");

const port: number = parseInt(process.env.PORT || "80", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  const io: socket.Server = new socket.Server();
  app.use(cookieParser());

  io.attach(server);

  const stream = require("./public/ws/stream");

  io.of("/stream").on("connection", stream);

  app.all("*", (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

// app.use(async (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (req.method === "GET" && token) {
//     await fetch(
//       "https://golf.devpartners.co.uk/production/api/member/getMember",
//       {
//         method: "POST",
//         headers: {
//           jwt: token
//         }
//       }
//     )
//       .then((response) => {
//         return response.json();
//       })
//       .then((response) => {
//         req.user = response.payload.member;
//       });
//
//     next();
//   } else {
//     if (req.query.room) {
//       res.sendStatus(401);
//     } else {
//       next();
//     }
//   }
// });
