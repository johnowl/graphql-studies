const Query = {
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
}

export { Query as default }