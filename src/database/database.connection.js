import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL);

mongoClient.connect()
.then(() => db = mongoClient.db())
.catch((err) => console.log(err.message))

const db = mongoClient.db()

export const usersCollection = db.collection('users')
export const sessaoCollection = db.collection('sessao')
export const transacaoCollection = db.collection('transacao')