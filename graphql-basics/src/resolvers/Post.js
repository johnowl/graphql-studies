const Post = {
    author(parent, args, context, info) {
        return context.db.users.find((user) =>
            user.id === parent.author
        )
    }
}

export { Post as default }