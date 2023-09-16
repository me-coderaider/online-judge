const express = require("express");
const bodyParser = require("body-parser");

const problemRoutes = require("./routes/problems-routes");
const HttpError = require("./model/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/problems", problemRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// adding error handling middleware, mainly for handling unknown request/paths
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred." });
});

app.listen(5000);

/*
app.set('view engine', 'ejs'); // this tell express to use this engine to display dynamic data
app.set('views', 'views'); // and using this, express can find where are those dynamic views stored


const authenticationRoutes = require('./routes/authentication');

app.use(bodyParser.urlencoded({ extended: false }));// this function yields a middleware (req,res,next)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use(authenticationRoutes);


// app.use("/input", (req,res,next)=>{
//     res.send('<form action="/input-msg" method="POST"><input type="text" name="title"/><button type="submit">Submit</button> </form>');
//     // next();
// });

app.use("/", (req, res, next) => {
    res.send('<h1>Hello from OJ Server!!!</h1>')
});

// mongoConnect(()=>{
app.listen(8080);
// });

*/
