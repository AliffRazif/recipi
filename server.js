require("dotenv").config()

const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')


const PORT = process.env.PORT || 3000;
const mongoURI = `mongodb+srv://${process.env.MONGO_UNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DB_NAME}`;

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(mongoURI, { useUnifiedTopology: true ,useNewUrlParser: true });

const db = mongoose.connection;

db.on("connected", () => console.log("Successfully connected to Mongo DB: " + process.env.MONGO_DB_NAME));
db.on("disconnected", () => console.log("Successfully disconnected from  Mongo DB: " + process.env.MONGO_DB_NAME));
db.on("error", (err) => {
     console.log("Error while connecting to mongo db: " + err.message);
});

app.use(
     session({
       secret: "secret-key",
       resave: false,
       saveUninitialized: false,
     })
   );

const recipeController = require("./controllers/recipe_controller");
app.use("/recipes", recipeController);

const sessionController = require("./controllers/session_controller");
app.use("/sessions", sessionController);

const userController = require("./controllers/user_controller");
app.use("/users", userController);

const checkLoggedIn = (req, res, next) => {
     if (!req.session.currentUser) {
       res.redirect("/sessions/new");
     } else {
       next();
     }
   };

app.get("/", checkLoggedIn, (req, res) => {
     res.redirect("/recipes");
   });




app.listen(PORT, () => {
    console.log("Authentication application is listening on port: " + PORT);
  });
