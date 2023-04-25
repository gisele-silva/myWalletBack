import { Router } from "express"
import { mostrarOperacao, operacaoEntradaSaida } from "../controllers/transacao.controllers.js";
import { transacaoSchemaValidate } from "../middlewares/transacao.middleweare.js";
import { authValidation } from "../middlewares/validateSchema.middleware.js";

const transacaoRouter = Router()

transacaoRouter.use(authValidation)
transacaoRouter.post("/transacao", transacaoSchemaValidate, operacaoEntradaSaida)
transacaoRouter.get("/transacao", mostrarOperacao)

export default transacaoRouter