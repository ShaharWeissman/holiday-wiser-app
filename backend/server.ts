//imports
require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import config from "./Utils/Config";
// import ErrorHandler from "./MiddleWare/route-not-found";
// import loginRouter from "./Routes/UserRouter";
import holidayRouter from "./Routes/HolidayRouter";
// import followRouter from "./Routes/FollowRouter";
import routeNotFound from "./MiddleWare/route-not-found";
import authRouter from "./Routes/auth-router";
import infoConsole from "./MiddleWare/info-console";
import expressFileUpload from "express-fileupload";
import userRouter from "./Routes/UserRouter";
import catchAll from "./MiddleWare/catch-all";
import { testConnection } from "./Utils/dal_mysql";

//create server
const server = express();

//handle cors
server.use(cors());
//support the file upload . it set files to the request.files
server.use(expressFileUpload());
//how we send the data back (JSON,XML,RAW,String)
server.use(express.json());

//where i will save the video files
server.use(express.static("user_videos"));
server.use('/assets', express.static("Assets"));

//parse the body as json , for easy work
server.use(bodyParser.json());

//connection in app level middleware
server.use(infoConsole);

//health check
server.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

//how to use the routes
server.use("/api/auth/", authRouter);
server.use("/api/holidays/", holidayRouter);
server.use("/api/admin/", holidayRouter);
server.use("/api/users/", userRouter);
server.use("*", routeNotFound);

server.use(catchAll);

server.listen(config.WebPort, async () => {
  // Call the testConnection function on app start
  testConnection();
  console.log(`Listening on the http://localhost:${config.WebPort}`);
});
