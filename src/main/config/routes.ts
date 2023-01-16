import { Express, Router } from "express";
import signupRoute from "../routes/signup.route";

export default (app: Express): void => {
  const router: Router = Router();

  signupRoute(router);
  app.use("/v1/api", router);
};
