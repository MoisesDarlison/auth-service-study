import { Router, Request, Response } from "express";

export default (route: Router): void => {
  route.post("/signup", (req: Request, res: Response) => {
    res.send({ ok: "ok" });
  });
};
