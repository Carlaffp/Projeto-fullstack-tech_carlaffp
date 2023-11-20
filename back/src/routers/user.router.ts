import { Router } from "express";
import { createUserController, deleteUserController, partialUpdateUserController, readUserController } from "../controllers/user.controller";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";
import { verifyEmailExist } from "../middlewares/verifyEmailExist.middleware";
import { verifyIdExist } from "../middlewares/verifyIdExist.middleware";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { verifyUserPermission } from "../middlewares/verifyUserPermission.middleware";

const userRouter: Router = Router();

userRouter.post(
  "",
  validateBodyMiddleware(userCreateSchema),
  verifyEmailExist,
  createUserController
);
userRouter.get(
  "",
  verifyToken,
  readUserController
  )

  userRouter.patch(
    "/:id",
    verifyToken,
    verifyUserPermission,
    verifyIdExist,
    validateBodyMiddleware(userUpdateSchema),
    verifyEmailExist,
    partialUpdateUserController
  )
  
userRouter.delete(
  "/:id",
  verifyToken,
  verifyUserPermission,
  verifyIdExist,
  deleteUserController
)
export { userRouter };
