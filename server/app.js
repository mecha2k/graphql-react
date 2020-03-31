const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const uriDB =
  "mongodb+srv://mecha2k:1234@graphql-c1gvk.mongodb.net/test?retryWrites=true&w=majority";
const connectDB = async function () {
  await mongoose.connect(uriDB, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log("connected to mongo Database");
};

const promise = connectDB();

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(3200, () => {
  console.log("Now, listening on port 3200.");
});

// const path = require("path");
// const logger = require("morgan");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const createError = require("http-errors");
//
// const graphQl = require("graphql");
// const graphqlHttp = require("express-graphql");
//
// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
//
// const app = express();
//
// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
//
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")));
//
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
//
// app.use(
//   "/graphql",
//   graphqlHttp({
//     schema: graphQl.buildSchema(`
//       type RootQuery { events: [String!] }
//       type RootMutation { createEvent(name: String): String }
//       schema {
//         query: RootQuery
//         mutation: RootMutation
//       }
//     `),
//     rootValue: {
//       events: () => {
//         return ["Romantic Cooking", "Sailing", "All-night coding"];
//       },
//       createEvent: args => {
//         return args.name;
//       }
//     },
//     graphiql: true
//   })
// );
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
//
// module.exports = app;
