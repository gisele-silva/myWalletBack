//import {  cadastroSchema, loginSchema } from "../schemas/user.schema.js"
import { sessaoCollection, usersCollection } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"


export async function cadastro (req, res){
    const { nome, email, senha } = req.body

    /*const validation = cadastroSchema.validate(req.body, { abortEarly: false })
    if(validation.error){
        const errors = validation.error.map((detail) => detail.message)
        return res.status(422).send(errors)
    }*/

    try {
        const usuario = await usersCollection.findOne({ email })
        if(usuario) return res.status(409).send("Email já cadastrado")

        const hash = bcrypt.hashSync(senha, 10)
        await usersCollection.insertOne({ nome, email, senha: hash })
        
        res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function login (req, res){
    const {email, senha} = req.body
    
    /*const validation = loginSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.map((detail) => detail.message)
        return res.status(422).send(errors)
    }*/

    try {
        const usuario = await usersCollection.findOne({ email })
        if(!usuario) return res.status(404).send("Email não cadastrado")

        const comparaSenha = bcrypt.compareSync(senha, usuario.senha)
        if (!comparaSenha) return res.status(401).send("Senha icorreta")

        const token = uuid()
        await sessaoCollection.insertOne({ userId: usuario._id, token })

        res.status(200).send(token)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}