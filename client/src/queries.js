import { gql } from "apollo-boost";

const getAuthorQuery = gql`
  query {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  query {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      id
    }
  }
`;

export { getAuthorQuery, getBooksQuery, addBookMutation };
