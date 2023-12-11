import { randomUUID } from "crypto"

export class DatabaseMemory{
#standups  = new Map()

list(search){
    return Array.from(this.#standups.entries()).map((standupsArray) =>{
    // acessando primeira posição
        const id = standupsArray[0]
        const data = standupsArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(standup => {
        if (search){
            return standup.tema.includes(search)
        }
        return true
    })
}
create(standup){
    const standupId = randomUUID()
    this.#standups.set(standupId, standup)
}
update(id, standup){
    this.#standups.set(id, standup)
}
delete(id, standup){
    this.#standups.delete(id, standup)
}
}