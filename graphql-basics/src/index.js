import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4 } from 'uuid'

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

// type definitions
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        isEmployed: Boolean!
        gpa: Float
        me: User!
        greeting(name: String!): String!
        grades: [Int!]!
        users(query: String): [User!]!
        posts: [Post!]!
    }
    type Mutation {
        createUser(data: CreateUserInput): User!
    }
    input CreateUserInput {
        name: String!
        email: String!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        author: User!
    }
`

// resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc-123'
        },
        name() {
            return 'João Paulo'
        },
        age() {
            return 34
        },
        isEmployed() {
            return true
        },
        gpa() {
            return 3.49
        },
        grades(parent, args, context, info) {
            return [99, 80, 93]
        },
        users(parent, args, context, info) {

            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
            })
        },
        posts(parent, args, context, info) {
            return posts
        },
        me() {
            return {
                id: "bbbccc",
                name: "José da Silva",
                email: "user@mail.com"
            }
        },
        greeting(parent, args, context, info) {
            console.log(parent)
            console.log(args)
            console.log(context)
            console.log(info)
            return `Hello ${args.name}`
        }
    },
    Mutation: {
        createUser(parent, args, context, info) {
            const emailTaken = users.some((user) => user.email === args.data.email)

            if (emailTaken) {
                throw new Error('E-mail taken.')
            }

            const user = { 
                id: uuidv4(), 
                ...args.data
            }

            users.push(user)

            return user
        }
    },
    User: {
        posts(parent, args, context, info) {
            return posts.find((post) => 
                post.author === parent.id
            )
        }
    },
    Post: {
        author(parent, args, context, info) {
            return users.find((user) =>
                user.id === parent.author
            )
        }
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})