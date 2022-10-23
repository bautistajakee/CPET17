const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const app = express();
const port = 3000;
  
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
  
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Motion Detection');
  });

app.post("/time", (req,res) => {
    let array = req.body.array
    console.log(array);
    connection.query(
        `INSERT INTO motion (datetime) VALUES ('${array.time}')`,
    );
    res.json('saved')
  });

app.post("/cap", (req, res) => {
  let array = req.body.array
  console.log(array);
  connection.query(
    `INSERT INTO motioncapture (datetime, capture) VALUES ('${array.time}', '${array.vid}')`,
  );
  res.json('saved')
});