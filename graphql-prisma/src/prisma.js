import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ id }')

    const user = prisma.query.user({
        where: {
            id: authorId
        }
    }, '{ id name email posts { id title published } }')

    return user
}

createPostForUser('cka9wr0cx01ii0851h5reml99', {
    title: 'Another post',
    body: 'My post body is new',
    published: true
}).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
})

// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL",
//         body: "Post body.",
//         published: true,
//         author: {
//             connect: {
//                 id: "cka9wr0cx01ii0851h5reml99"
//             }
//         }
//     }
// }, '{ id title body published }').then((data) => {
//     console.log(data)
//     return prisma.query.users(null, '{id name posts { id title } }')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })