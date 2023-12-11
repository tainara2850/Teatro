import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/standup', (request, reply) => {
// Acessando dados do corpo da requisição
    const {tema, ncapacidade, duracao} = request.body
   
    database.create({
        tema: tema,
        ncapacidade: ncapacidade,
        duracao: duracao,
    })

    return reply.status(201).send
})

server.get('/standup', (request) => {
    const search = request.query.search
    console.log(search)
    const standups  = database.list(search)
    console.log(standups)
    return standups
})

server.put('/standups/:id', (request, reply) => {
    const standupId = request.params.id
    const {tema, ncapacidade, duracao} = request.body
    const standup =  database.update(standupId, {
        tema: tema,
        ncapacidade: 286,
        duracao: 120,
    })
    return reply.status(204).send()
})

server.delete('/standups/:id', (request, reply) => {
    const standupId = request.params.id

    database.delete(standupId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})