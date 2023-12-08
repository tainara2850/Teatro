import { randomUUID } from "crypto"

export class DatabaseMemory{
#teatros = new Map()

list(search){
    return Array.from(this.#teatros.entries()).map((teatrosArray) =>{
    // acessando primeira posição
        const id = teatrosArray[0]
        const data = teatrosArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(teatro => {
        if (search){
            return teatro.tema.includes(search)
        }
        return true
    })
}
create(teatro){
    const teatroId = randomUUID()
    this.#teatros.set(teatroId, teatro)
}
update(id, teatro){
    this.#teatros.set(id, teatro)
}
delete(id, teatro){
    this.#teatros.delete(id, teatro)
}
}