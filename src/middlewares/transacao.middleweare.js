import dayjs from "dayjs"
import { transacaoSchema } from "../schemas/transacao.schema.js"


export function transacaoSchemaValidate (req, res, next){
    const {value, descricao, type} = req.body
    
    const usuario = res.locals.usuario
    
    const transacao = {
        value, 
        descricao,
        type,
        usuario: usuario._id,
        createdAt: dayjs().format('DD/MM/YYYY')
    }

    const { error } = transacaoSchema.validate(transacao, {abortEarly: false})
    
    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    res.locals.transacao = transacao
    console.log("res.locals.transacao: ", res.locals.transacao)
    next ()
}
