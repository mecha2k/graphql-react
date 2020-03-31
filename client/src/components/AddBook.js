import React from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getBooksQuery, getAuthorQuery, addBookMutation } from "../queries";

class AddBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: "", genre: "", authorid: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayAuthors() {
    let data = this.props.data;
    if (data.loading) return <option disabled>Loading Authors...</option>;
    else
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.addBookMutation({
    //   variables: { name: this.state.name, genre: this.state.genre, authorid: this.state.authorid },
    //   refetchQueries: [{ query: getBooksQuery }],
    // });
  }

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(event) => this.setState({ name: event.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(event) => this.setState({ genre: event.target.value })} />
        </div>
        <div className="field">
          <label>Author:</label>
          {/*<input*/}
          {/*  type="text"*/}
          {/*  onChange={(event) => this.setState({ authorid: event.target.value })}*/}
          {/*/>*/}
          <select>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorQuery)(AddBook);

// export default compose(
//   graphql(getAuthorQuery, { name: "getAuthorQuery" }),
//   graphql(addBookMutation, { name: "addBookMutation" })
// )(AddBook);
