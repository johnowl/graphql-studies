const User = {
    posts(parent, args, context, info) {
        return context.db.posts.find((post) => 
            post.author === parent.id
        )
    }
}

export { User as default }