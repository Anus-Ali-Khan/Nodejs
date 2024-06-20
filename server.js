const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3500;

//Middlewares : All those things b/w request and response are middlewares
//There are 3 types of middlewares:
// 1) Builtin
// 2) Custom
// 3) Third party

//Custom middlewares
app.use(logger);

//Cross Origin Resource Sharing

app.use(cors(corsOptions));

/* builtin middleware: to handle url-encoded data
  in other words, form data : 
  content-type :  application/x-www-form-urlencoded*/

app.use(express.urlencoded({ extended: false })); //app.use denotes middleware

//built-in middleware for json
app.use(express.json());

//serve static(apply css to our files) files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
//employees routes
app.use("/employees", require("./routes/api/employees"));
//user routes
app.use("/register", require("./routes/register"));
//auth routes
app.use("/auth", require("./routes/auth"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html")); // here we re adding status(404) otherwise it will find 404.html file and returns 200
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Custom Error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
