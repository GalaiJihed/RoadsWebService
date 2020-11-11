import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import addtag from "./addtag";
import store from "./store"
const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/tag", addtag);
routes.use("/store",store)
export default routes;