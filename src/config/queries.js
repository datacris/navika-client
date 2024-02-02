import { gql } from "@apollo/client";

export const USER_SIGN_IN = gql`
  mutation userSignIn($input: SignInInput) {
    userSignIn(input: $input) {
      token
    }
  }
`;
export const CREATE_NEW_USER = gql`
  mutation createNewUser($input: UserInput) {
    createNewUser(input: $input) {
      id
      name
      email
    }
  }
`;
export const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      email
    }
  }
`;
export const CREATE_NEW_QUOTE = gql`
  mutation newQuote($input: QuoteInput) {
    newQuote(input: $input) {
      id
      quote
      reference
      author
      book
    }
  }
`;
export const GET_QUOTES = gql`
  query guetQuotes {
    getQuotes {
      id
      quote
      reference
      author
      book
      created
    }
  }
`;
export const DELETE_QUOTE = gql`
  mutation deleteQuote($id: ID!) {
    deleteQuote(id: $id)
  }
`;
