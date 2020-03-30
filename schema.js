const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const _ = require("lodash");

let books = [
  { name: "Name of the wind", genre: "Fantasy", id: "1", authorid: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorid: "2" },
  { name: "The Long Earth", genre: "Fantasy", id: "3", authorid: "3" },
  { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorid: "2" },
  { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorid: "3" },
  { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorid: "3" },
];

let authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 34, id: "2" },
  { name: "Terry Pratchett", age: 62, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorid });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorid: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
