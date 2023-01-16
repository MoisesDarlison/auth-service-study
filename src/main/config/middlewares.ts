import { Express } from "express";
import { bodyParser, contentTypeDefault, cors } from "../middlewares";

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentTypeDefault);
};
