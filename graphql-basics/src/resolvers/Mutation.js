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
    }
}

export { Mutation as default }