import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

class BookList extends React.Component {
  displayBooks() {
    let data = this.props.data;
    if (data.loading) return <div>Loading books...</div>;
    else
      return data.books.map((book) => {
        return <li>{book.name}</li>;
      });
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <ul className="book-list">{this.displayBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
