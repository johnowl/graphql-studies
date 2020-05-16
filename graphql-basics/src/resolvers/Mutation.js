import { v4 as uuidv4 } from 'uuid'

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken =db.users.some((user) => user.email === args.data.email)

        if (emailTaken) {
            throw new Error('E-mail taken.')
        }

        const user = { 
            id: uuidv4(), 
            ...args.data
        }

        db.users.push(user)

        return user
    },
    updateUser(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('User not found')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email && user.id != id)
            throw new Error('E-mail taken')

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        return user
    }
}

export { Mutation as default }