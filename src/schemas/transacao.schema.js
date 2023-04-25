import joi from "joi"

export const transacaoSchema = joi.object({
    tipo: joi.string().required().valid("entrada", "saida"),
    valor: joi.number().positive().precision(2).required(),
    descricao: joi.string().required(),
    usuario: joi.object().required(),
    createdAt: joi.string().required()
})