const graphql = require("graphql");
const _ = require("lodash");

const Book = require("./book");
const Author = require("./author");

const BookType = new graphql.GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    genre: { type: graphql.GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return Author.findById(parent.authorid);
      },
    },
  }),
});

const AuthorType = new graphql.GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt },
    books: {
      type: graphql.GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorid: parent.id });
      },
    },
  }),
});

const RootQuery = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: graphql.GraphQLID } },

      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: graphql.GraphQLID } },

      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },

    books: {
      type: graphql.GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },

    authors: {
      type: graphql.GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
  },
});

const Mutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        age: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({ name: args.name, age: args.age });
        return author.save();
      },
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        genre: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        authorid: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({ name: args.name, genre: args.genre, authorid: args.authorid });
        return book.save();
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({ query: RootQuery, mutation: Mutation });
