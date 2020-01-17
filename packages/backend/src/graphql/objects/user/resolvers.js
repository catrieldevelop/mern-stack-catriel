
export const Query = {
    sayHello: async (_, args, context) => {
        return "sayHello"
    },
};

export const Mutation = {
    mutHello: async (_, args, context) => {
        return "mut hellos"
    },
}
export const User = {
    user: user =>
        Promise.resolve(`${user.first_name} ${user.last_name}`),
};

