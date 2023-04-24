import { Router } from "express"
import { login, cadastro } from "../controllers/user.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { cadastroSchema, loginSchema } from "../schemas/user.schemas.js";

const userRouter = Router()

userRouter.post("/sign-up", validateSchema(cadastroSchema), cadastro)
userRouter.post("/sign-in", validateSchema(loginSchema), login)

export default userRouter