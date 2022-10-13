const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

//database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.get("/", (req, res) => {
  res.send("Hello 4B!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//delete using id
//Delete: http://localhost:3000/delete?id=2
app.get("/delete", (req, res) => {
  console.log(req.query);
  connection.query(
    "DELETE FROM users WHERE id = ?",
  [req.query.id],
  function (err, results) {
    console.log(results);
    res.send("Thank you");
  })
});

//insert
//Insert" http://localhost:3000/insert?fname=jake&lname=bautista&phonenum=09638527417&add1=bacoor&add2=cavite&email=jake@email.com
app.get('/insert', (req, res) => {
  connection.query('INSERT INTO users (firstname, lastname, phone, address1, address2, email) VALUES (?, ?, ?, ?, ?, ?)',[req.query.fname,req.query.lname,req.query.phonenum,req.query.add1,req.query.add2,req.query.email],(err, response) =>{
   if (err) throw err;
   res.send("Successfully added to the database 😣");
  });
});

//update
//Update: http://localhost:3000/update?fname=jake&lname=bautista&phonenum=09638527417&add1=bacoor&add2=cavite&email=jake@email.com&id=11
app.get('/update', (req, res) => {
  connection.query('UPDATE users SET firstname=?, lastname=?, phone=?, address1=?, address2=?, email=? WHERE id=?',[req.query.fname,req.query.lname,req.query.phonenum,req.query.add1,req.query.add2,req.query.email,req.query.id],(err, response) =>{
   if (err) throw err;
   res.send("Successful");
  });
});

//read
app.get("/allusers", (req, res) => {
  console.log(req.query);
  connection.query(
    "SELECT firstname FROM `users`",
    function (err, results) {
      console.log(results);
      // first check if there are results

      try {
        //check len of results
        //if (len>0) -> loop
        //else -> respond no users in db
        let names = ""
        for (let i = 0; i < results.length; i++) {
          names = names+" " +`${results[i].firstname}`
        }
        res.send(names);
      } catch (err) {
        res.send(`Error: ${err}!`);
      }
    }
  );
});