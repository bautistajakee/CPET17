const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const app = express();
const port = 3000;
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
  
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
    `INSERT INTO motioncapture (datetime, capture) VALUES ('${array.time}', "C:\\Users\\haira\\Documents\\Code\\capture_video.avi")`,
  );
});