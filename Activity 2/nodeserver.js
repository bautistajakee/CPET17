const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const app = express();
const port = 3000;
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
  
// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

app.post("/addstudent", (req, res) => {
    //get data
    let array = req.body.array;  
    console.log(array);
    //save data
    connection.query(
        `INSERT INTO students (studentid, studentname) VALUES ('${array.id}', '${array.name}')`,
    );
    //reply
    res.json(`${array.name} has been added`);
});

app.get("/read", (req, res) => {
  connection.query("SELECT * FROM students", (err, results) => {
    try {
      if (results.length > 0) {
        res.json(results);
        console.log(results);
      }
    } catch (err) {
      res.json({ message: err });
    }
  });
});

app.put('/update', (req,res) => {
  let array = req.body.array;
  console.log(array);
      if (array.pkid && array.newname && array.newsid){
          connection.query(`UPDATE students SET studentname = '${array.newname}', studentid ='${array.newsid}' WHERE id ='${array.pkid}'`)
          res.json('SUCCESSFULLY UPDATED!')
      }
      else if (array.pkid && array.newname){
          connection.query(`UPDATE students SET studentname = '${array.newname}' WHERE id ='${array.pkid}'`)
          res.json('SUCCESSFULLY UPDATED!')
      }
      else if (array.pkid && array.newsid){
          connection.query(`UPDATE students SET studentid ='${array.newsid}' WHERE id ='${array.pkid}'`)
          res.json('SUCCESSFULLY UPDATED!')
      }
})

//delete
app.delete("/deletestudent", (req,res) => {
  let array = req.body.array
  console.log(array);
  connection.query("DELETE FROM students WHERE studentid = ?", [array.id], (err, results) => {
    try {
      if (results.affectedRows > 0) {
        res.json(`${array.id} has been deleted`);
      } else {
        res.json("Student not found");
      }
    } catch (err) {
      res.json({ message: err });
    }
  });

})

app.post("/time", (req,res) => {
  let array = req.body.array
  console.log(array);
  res.json('saved')
});