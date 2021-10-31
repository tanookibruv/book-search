const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate("savedBooks");
        },
        user: async (parent, { username }) => {
            return User.findOne.({ username }).populate("savedBooks");
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user_id }).populate("savedBooks");
            }
            throw new AuthenticationError("Please Log in to continue!")
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            try {
                const user = await User.create({ username, email, password });
                const token = signToken(user);
                
                return { token, user };
            } catch (err) {
                console.log(err)
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("No user found with this email!");
            }
            
            const credentials = await user.isCorrectPassword(password);

            if (!credentials) {
                throw new AuthenticationError("Password does not matchup with email!")
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook:
    }
}