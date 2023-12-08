import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/teatros', (request, reply) => {
// Acessando dados do corpo da requisição
    const {tema, ncapacidade, duracao} = request.body
// Exibindo dados
// console.log(body)
   
    // return 'cadastrar'
    database.create({
       tema: tema,
        ncapacidade: 286,
        duracao: 120,
    })

    return reply.status(201).send
})

server.get('/teatros', (request) => {
    const search = request.query.search
    console.log(search)
    const teatros = database.list(search)
    console.log(teatros)
    return teatros
})

server.put('/teatros/:id', (request, reply) => {
    const teatroId = request.params.id
    const {tema, ncapacidade, duracao} = request.body
    const teatros = database.update(teatroId, {
        tema: tema,
        ncapacidade: 286,
        duracao: 120,
    })
    return reply.status(204).send()
})

server.delete('/teatros/:id', (request, reply) => {
    const teatroId = request.params.id

    database.delete(teatroId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})