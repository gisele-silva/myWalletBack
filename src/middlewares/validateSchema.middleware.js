import { sessaoCollection, usersCollection } from "../database/database.connection.js"

//validação para login, cadastro e entrada/saida
export function validateSchema(schema) {

    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false })
        
        if(validation.error){
            const errors = validation.error.details.map((detail) => detail.message)
            return res.status(422).send(errors)
        }
    
    next()

    }

}

//validação das rotas

export async function authValidation(req, res, next){
    
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    console.log("tokennnn: ", token)

    if(!token) return res.status(401).send("Token inexistente")

    try {
        
        const sessao = await sessaoCollection.findOne({ token })
    
        //if (!sessao) return res.status(401).send("Token inválido")
        
        const usuario = await usersCollection.findOne({_id: sessao?.userId})
        if(!usuario) return res.status(401).send("Não autorizado")
    
        res.locals.usuario = usuario
        //res.locals.sessao = sessao
    } catch (error) {
        return res.status(500).send(error.message) 
    }
    next()
}