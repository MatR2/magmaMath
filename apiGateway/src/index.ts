import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";

const port = process.env.port || 8080;
const userServiceURL = process.env.USER_SERVICE || "http://127.0.0.1:3000";
async function StartServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/", proxy(userServiceURL));

  app.listen(port, () => {
    console.log("API Gateway is listening");
  });
}
StartServer();
