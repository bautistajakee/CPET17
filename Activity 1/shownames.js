const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.get("/", (req, res) => {
  res.send("Hello 4B!");
});

//show one name
app.get("/users", (req, res) => {
  console.log(req.query);
  // connect to database
  // query list all users
  // with placeholder
  connection.query(
    "SELECT * FROM `test` WHERE id = ?",
    [req.query.id],
    function (err, results) {
      console.log(results);
      // first check if there are results
      try {
        res.send(`Hi ${results[0].name}!`);
      } catch (err) {
        res.send(`Error: ${err}!`);
      }
    }
  );
  // if(results) -> response all users
  // if(!results) -> response error message
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//show all names
app.get("/allusers", (req, res) => {
  console.log(req.query);
  connection.query(
    "SELECT name FROM `test`",
    function (err, results) {
      console.log(results);

      try {
        //check len of results
        //if (len>0) -> loop
        //else -> respond no users in db
        let names = ""
        for (let i = 0; i < results.length; i++) {
          names = names+" " +`${results[i].name}`
        }
        res.send(names);
      } catch (err) {
        res.send(`Error: ${err}!`);
      }
    }
  );
  // if(results) -> response all users
  // if(!results) -> response error message
});

app.get("/delete", (req, res) => {
  console.log(req.query);
  connection.query(
    "DELETE FROM users WHERE id = ?",
  [req.query.id],
  function (err, results) {
    console.log(results);
    res.send("Thank you");
  }
  )
});

app.get('/create/:firstname/:lastname/:phone/:address1/:address2/:email', function(req, res) {
  console.log(req.params.firstname, req.params.lastname, req.params.phone, req.params.address1, req.params.address2, req.params.email)
  connection.query(
    "INSERT INTO `users`(`firstname`, `lastname`, `phone`, `address1`, `address2`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?)"
    [req.query.id],
    )
  res.send("ok");
});

app.get("/insert", (req, res) => {
  console.log(req.query);
  connection.query(
    "INSERT INTO `users` (`firstname`, `lastname`, `phone`, `address1`, `address2`, `email`) VALUES ('${req.query.fn}', '${req.query.ln}', '${req.query.phone}', '${req.query.add1}', '${req.query.add2}', '${req.query.email}')",
    //"INSERT INTO test (fn, ln, phone, add1, add2, email) VALUES ('john lerry', 'laungayan', '09952478227', 'BLK 4 LOT 11', 'bacoor', 'test1@gmail.com')",
  function (err, results) {
    console.log(results);
    try {
      res.send(`Thank you ${req.query.fn}!`);
    } catch (err) {
      res.send(err + "error");
    }
  }
  )
});

app.get('/inserts', (req, res) => {
  connection.query('INSERT INTO users (firstname, lastname, phone, address1, address2, email) VALUES (?, ?, ?, ?, ?, ?)',[req.query.fname,req.query.lname,req.query.phonenum,req.query.add1,req.query.add2,req.query.email],(err, response) =>{
   if (err) throw err;
   res.send("Successfully added to the database 😣");
  });
});

app.get('/update', (req, res) => {
  connection.query('UPDATE users SET firstname=?, lastname=?, phone=?, address1=?, address2=?, email=? WHERE id=?',[req.query.fname,req.query.lname,req.query.phonenum,req.query.add1,req.query.add2,req.query.email,req.query.id],(err, response) =>{
   if (err) throw err;
   res.send("Successful");
  });
});


//Sample
//Insert" http://localhost:3000/update?fname=jake&lname=bautista&phonenum=09638527417&add1=bacoor&add2=cavite&email=jake@email.com
//Update: http://localhost:3000/update?fname=jake&lname=bautista&phonenum=09638527417&add1=bacoor&add2=cavite&email=jake@email.com&id=11
//Delete: http://localhost:3000/delete?id=2