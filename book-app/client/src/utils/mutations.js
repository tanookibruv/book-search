import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user (
                _id
                username
            )
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput!) {
        saveBook(input: $input) {
            user (
                _id
                username
            )
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: Int!) {
        deleteBook(bookId: $bookId) {
            user {
                _id
                username
            }
        }
    }
`;