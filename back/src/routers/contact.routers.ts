import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { contactCreateSchema } from "../schemas/contact.schema";
import { createContactController, deleteContactController, readContactController, retrieveContactController, updateContactController} from "../controllers/contact.controller";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { verifyIdContactExist } from "../middlewares/verifyIdContactExixt.middleware";
import { verifyUserContactExists } from "../middlewares/verifyUserContactExist.middleware";


const contactRouter: Router = Router()

contactRouter.post(
  "",
  verifyToken,
  validateBodyMiddleware(contactCreateSchema),
  createContactController
)

contactRouter.get(
  "",
  verifyToken,
  readContactController
)
contactRouter.get(
  "/:id",
  verifyToken,
  verifyIdContactExist,
  verifyUserContactExists,
  retrieveContactController
)

contactRouter.patch(
  "/:id",
  verifyToken,
  verifyIdContactExist,
  verifyUserContactExists,
  updateContactController
)

contactRouter.delete(
  "/:id",
  verifyToken,
  verifyIdContactExist,
  verifyUserContactExists,
  deleteContactController
)

export {contactRouter}