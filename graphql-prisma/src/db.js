const users = [
    { id: "123", name: "José", email: "jose@mail.com" },
    { id: "124", name: "João", email: "joao@mail.com" },
    { id: "125", name: "Maria", email: "maria@mail.com" },
]

const posts = [
    { id: "1", author: "123", title: "GraphQL post", body: "GraphQL lorem ipsum dolor sit amet." },
    { id: "2",author: "124", title: "Javascript post", body: "Lorem ipsum dolor sit Javascript amet." },
    { id: "3", author: "123", title: "Kotlin post", body: "Lorem ipsum dolor Kotlin sit amet." },
]

const db = {
    users,
    posts
}

export { db as default }