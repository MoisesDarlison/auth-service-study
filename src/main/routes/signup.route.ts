import { Router } from "express";
import { adaptRoute } from "../adapters/express-routes.adapter";
import { makeSignUpController } from "../factories/signup-controller.factory";

export default (route: Router): void => {
  route.post("/signup", adaptRoute(makeSignUpController()));
};
