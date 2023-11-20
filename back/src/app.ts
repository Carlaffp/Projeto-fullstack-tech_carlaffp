import 'express-async-errors';
import express, { Application } from 'express';
import { userRouter } from './routers/user.router';
import { loginRouter } from './routers/login.router';
import handleErrosMiddleware from './middlewares/handleErros.middleware';
import { contactRouter } from './routers/contact.routers';


const app: Application = express();
app.use(express.json());

app.use("/users", userRouter)
app.use("/login", loginRouter)
app.use("/contacts", contactRouter)

app.use(handleErrosMiddleware.erro)

export default app