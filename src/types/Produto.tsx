export interface Root {
    produtos: Produto[]
}

export interface Produto {
    id: string
    name: string
    desc: string
    price: number
    img: string
}
