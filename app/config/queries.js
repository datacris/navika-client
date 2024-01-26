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