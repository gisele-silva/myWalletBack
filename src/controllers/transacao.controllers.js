import { transacaoCollection } from "../database/database.connection.js"

//Cadastrando as transações-post
export async function operacaoEntradaSaida (req, res) {

    const transacao = res.locals.transacao
    console.log("operacaoEntradaSaIda")
    console.log("transacao: ", transacao)
    try {
        await transacaoCollection.insertOne(transacao)
        return res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error.message) 
    }
}


//Buscando as transações
export async function mostrarOperacao (req, res) {
   const usuario = res.locals.usuario
   console.log("mostrar operacao")
   console.log("usuariOOO: ", usuario)
   try {
       
        const transacoes = await transacaoCollection.find({ usuario: usuario._id }).toArray()
        console.log("transacoeees: ", transacoes)
        delete usuario.senha
        return res.status(200).send({transacoes, usuario})
    } catch (error) {
        return res.status(500).send(error.message) 
    }
}