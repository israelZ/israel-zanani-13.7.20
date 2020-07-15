var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");
var session = require("express-session");

const users = require("./routes/users");
const task = require("./routes/task");
const { json } = require("express");

var app = express();

// view engine setup

app.use(express.static(path.join(__dirname, './dist/propit')));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "aldr34kgXSe4tuj23",
    resave: false,
    saveUninitialized: true,
  })
);

var db_config = {
  host: "bubpc6xpqdvjpidywbpi-mysql.services.clever-cloud.com",
  user: "urapgmr4mhkogyz6",
  password: "31K00vmSQWFIhyqdHTUQ",
  database: "bubpc6xpqdvjpidywbpi",
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();



app.get('/', function(req, res) {
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/propit/index.html'));
});


app.get("/api/isLogout", (req, res) => {
  console.log('Hi');
  console.log(req.session.user);

  if (req.session.user) {
    req.session.user = null;
    res.status(200).json(true).end();
  }
  else
  res.status(200).json(false).end();
});


app.post("/api/add_user", (req, res) => {
  let email = req.body;
  console.log(email);

  connection.query(
    `INSERT INTO users(name,family,password,mail) VALUES ('${req.body.name}','${req.body.family}','${req.body.password}','${req.body.mail}')`,
    function (error, results, fields) {
      if (error) {
        res.status(404).json(error).end();
      }
      res.status(200).json(true).end();
    }
  );
});


app.post("/api/fund_user", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  console.log(email,password);

  connection.query(
    `SELECT * FROM users WHERE mail='${email}' AND password='${password}'`,
    function (error, results, fields)
    {
      if (error) {
        return res.status(404).json(error).end();
      }
      else
      {
        console.log(results)
        if (results.length!=0) {
          req.session.user = { id: results[0].id, type: results[0].type };
          return res.status(200).json(results[0].type).end();
        }
        else{
          return res.status(404).json(false).end();
        }

      }

    }
  );
});

app.get("/api/all_task", (req, res) => {
  let test;

  switch (req.session.user.type) {
    case "mng":
      connection.query("SELECT * from task", function (error, results, fields) {
        if (error) throw error;

        return res.status(200).json(results);
      });

      break;
    case "cus":
      connection.query(
        `SELECT * from task WHERE id=${req.session.user.id}`,
        function (error, results, fields) {
          if (error) throw error;

          return res.status(200).json(results);
        }
      );

      break;

    default:
      break;
  }
});

app.post("/api/add_new_task", (req, res) => {
  connection.query(
    `INSERT INTO task (id,name,mail,phone,content,active) VALUES (${req.session.user.id},'${req.body.name}','${req.body.mail}',${req.body.phone},'${req.body.content}',1)`,
    function (error, results, fields) {
      if (error) throw error;
      console.log("The solution is: ", results);
      // });
      return res.status(200).json(true);
    }
  );
});

app.post("/api/update_task", (req, res) => {
  connection.query(
    `UPDATE task SET name='${req.body.name}',mail='${req.body.mail}',phone='${req.body.phone}',content='${req.body.content}'WHERE id_task=${req.body.id_task}`,
    function (error, results, fields) {
      if (error) throw error;
      console.log("The solution is: ", results);
      // });
      return res.status(200).json("results");
    }
  );
});

app.delete("/api/delet_task", (req, res) => {

  
  connection.query(
    `DELETE FROM task WHERE id_task='${req.query.id_task}'`,
    function (error, results, fields) {
      if (error) throw error;

      return res.status(200).json(true);
    }
  );
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
