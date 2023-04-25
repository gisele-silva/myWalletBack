import { sessaoCollection, usersCollection } from "../database/database.connection.js"

export async function authValidation(req, res, next){
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.status(401).send("Token inexistente")

    try {
       
        const sessao = await sessaoCollection.findOne({ token })
        if (!sessao) return res.status(401).send("Token inválido")
        
        const usuario = await usersCollection.findOne({_id: sessao.userId})
        if(!usuario) return res.status(401).send("Não autorizado")
        //delete usuario.senha
        
        res.locals.usuario = usuario
        
        next()
    } catch (error) {
        return res.status(500).send(error.message) 
    }
    next()
}