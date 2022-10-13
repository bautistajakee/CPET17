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
  res.send("connected");
});


//create tables in db
app.get("/create_tables", (req, res) => {
  console.log(req.query);
  connection.query(
    "CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, firstname VARCHAR(255), lastname VARCHAR(255), phone VARCHAR(15), address1 VARCHAR(255), address2 VARCHAR(255), email VARCHAR(100), PRIMARY KEY(id))",
  function (err, results) {
    console.log(results);
    try {
      res.send('Table Created');
    } catch (err) {
      res.send(err + "error");
    }
  }
  )
})

//delete table
app.get("/drop_tables", (req, res) => {
  console.log(req.query);
  connection.query(
    "DROP table users",
  function (err, results) {
    console.log(results);
    try {
      res.send('Table Deleted');
    } catch (err) {
      res.send(err + "error");
    }
  }
  )
})

//insert data
app.get("/insert", (req, res) => {
  console.log(req.query);
  connection.query(
    `INSERT INTO users (firstname, lastname, phone, address1, address2, email) VALUES ('${req.query.firstname}', '${req.query.lastname}', '${req.query.phone}', '${req.query.address1}', '${req.query.address2}', '${req.query.email}')`,
  function (err, results) {
    console.log(results);
    try {
      //res.send(`Thank you ${req.query.firstname} with id = ${results.insertId}!`);
      res.send(`${req.query.firstname} was successfully added to the database`)
    } catch (err) {
      res.send(err + "error");
    }
  }
  )
})
//update
app.get("/update", (req, res) => {
  console.log(req.query);
  connection.query(
    `UPDATE users SET firstname = '${req.query.firstname}', lastname = '${req.query.lastname}', phone = '${req.query.phone}', address1 = '${req.query.address1}', address2 = '${req.query.address2}', email = '${req.query.email}' WHERE id = ?`,
  [req.query.id],
  function (err, results) {
    console.log(results);
    try {
      //res.send(`Thank you ${req.query.firstname} with id = ${results.insertId}!`);
      res.send(`Update Successful`)
    } catch (err) {
      res.send(err);
    }
  }
  )
})
//delete data
app.get("/delete", (req, res) => {
  console.log(req.query);
  connection.query(
    "DELETE FROM users WHERE id = ?",
  [req.query.id],
  function (err, results) {
    console.log(results);
    res.send("Deleted");
  }
  )
})

//

//show one name
app.get("/users", (req, res) => {
  console.log(req.query);
  // connect to database
  // query list all users
  // with placeholder
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [req.query.id],
    function (err, results) {
      console.log(results);
      // first check if there are results
      try {
        res.send(`Hi ${results[0].firstname}!`);
      } catch (err) {
        res.send(err);
        console.log("not found");
      }
    }
  );
  // if(results) -> response all users
  // if(!results) -> response error message
});

//show all names
app.get("/allusers", (req, res) => {
  console.log(req.query);
  connection.query(
    "SELECT firstname FROM users",
    function (err, results) {
      console.log(results);
      // first check if there are results

      try {
        //check len of results
        //if results>0
          //loop
        //else
          //no users in db
        let fn = ""
        for (let i = 0; i < results.length; i++) {
          fn = fn+" " +`${results[i].firstname}`
         
        }
        res.send(fn);   
      } catch (err) {
        res.send(err);
      }
    }
  );
  // if(results) -> response all users
  // if(!results) -> response error message
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});