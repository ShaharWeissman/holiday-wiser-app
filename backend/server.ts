
//imports
require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors"; 
import express from "express";
import config from "./Utils/Config";
import ErrorHandler from "./MiddleWare/route-not-found";
import loginRouter from "./Routes/UserRouter";
import holidayRouter from "./Routes/HolidayRouter";
// import followRouter from "./Routes/FollowRouter";
import routeNotFound from "./MiddleWare/route-not-found";
import authRouter from "./Routes/auth-router";
import catchAll from "../backend/MiddleWare/catch-all";
import infoConsole from "./MiddleWare/info-console";
import expressFileUpload from "express-fileupload"
import userRouter from "./Routes/UserRouter";

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


//enable file uploading, and create a path for the files if it not exists
// server.use(fileUpload({ createParentPath: true }));


//parse the body as json , for easy work
server.use(bodyParser.json());

//connection in app level middleware
// server.use(dataGuard);
server.use(infoConsole);

//how to use the routes
server.use("/api/auth/", authRouter);
server.use("/api/holidays/", holidayRouter);
server.use("/api/admin/", holidayRouter);
// server.use("/api/follow/", followRouter);
server.use("/api/users/", userRouter);


// server.use("/api/v1/test/" , router)


//handle errors (route not found)
server.use("*", routeNotFound);

server.use(catchAll);


// start the server
server.listen(config.WebPort, () => {
	console.log(`Listening on the http://localhost:${config.WebPort}`);
});
// server.listen(config.WebPort, () => {
// 	console.log(`listing on http://localhost:${config.WebPort}`);
// 	console.log(
// 	  `for testing use the path http://localhost:${config.WebPort}/api/v1/test/checkOK`
// 	);
// 	console.log(
// 	  `for testing use the path http://localhost:${config.WebPort}/api/v1/test/checkBad`
// 	);
//   });
  