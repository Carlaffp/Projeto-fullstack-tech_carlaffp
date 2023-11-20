import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { loginSchema } from "../schemas/login.schema";
import { createLoginController } from "../controllers/login.controller";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  validateBodyMiddleware(loginSchema),
  createLoginController
)

export {loginRouter}