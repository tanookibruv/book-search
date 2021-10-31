const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Books]
        bookCount: Int
    }
    input BookInput {
        title: String
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
    }
    type Book {
        _id: ID
        title: String
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
    }
    type Auth {
        token: String
        user: User
    }
    type Query {
        users: [User]
        user(username: String!): User
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input: BookInput): User
        deleteBook(bookId: Int!): User
    }
`;

module.exports = typeDefs;