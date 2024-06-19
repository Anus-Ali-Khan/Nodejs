const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
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
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

/* builtin middleware: to handle url-encoded data
  in other words, form data : 
  content-type :  application/x-www-form-urlencoded*/

app.use(express.urlencoded({ extended: false })); //app.use denotes middleware

//built-in middleware for json
app.use(express.json());

//serve static(apply css to our files) files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
//employees api
app.use("/employees", require("./routes/api/employees"));

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
