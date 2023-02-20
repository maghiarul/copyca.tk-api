const express = require("express");
const cors = require("cors");
const app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var db = require("./connection.js");
app.use(cors());

const port = process.env.PORT || 4000;

app.post("/addPaste", (req, res) => {
  var id = req.body.id;
  var msg = req.body.msg;
  var timestamp = req.body.timestamp;
  if (msg !== "" && id !== "") {
    db.query(
      `INSERT INTO paste (id, paste, time) VALUES ("${id}", "${msg}", "${timestamp}")`,
      (err, result) => {
        if (err) throw err;
      }
    );
  }
});

app.post("/getPaste", (req, res) => {
  var pasteId = req.body.pasteId;
  if (pasteId !== "") {
    db.query(
      `SELECT paste FROM paste WHERE id = "${pasteId}"`,
      (err, result) => {
        // res.send(result);
        if (err) throw err;
        else {
          res.send(result);
        }
      }
    );
  }
});

//later idea

app.get("/allPosts", (req, res) => {
  var date = Date.now();
  db.query("SELECT * FROM paste ", (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
      for (var i = 0; i < result.length; i++) {
        if (date - result[i].time > 10000) {
          db.query(`DELETE paste FROM paste WHERE time = "${result[i].time}"`);
        }
      }
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
