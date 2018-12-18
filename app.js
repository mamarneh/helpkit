// load our app server using express somehow....
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))
const getCats = require('./getCat.js')
const getCatProducts = require('./getCatProducts.js')
app.get('/user/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: '192.168.64.2',
    user: 'helpkit',
    database: 'helpkit'
  })

  const userId = req.params.id
  const queryString = "SELECT * FROM user WHERE id = ?"
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
      // throw err
    }

    console.log("I think we fetched users successfully")

    const users = rows.map((row) => {
      return {firstName: row.name, phone_number: row.phone_number}
    })

    res.json(users)
  })

  // res.end()
})


// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})
