// load our app server using express somehow....
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))
app.get('/getCategories', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: '192.168.64.2',
    user: 'helpkit',
    database: 'helpkit'
  })

  
  const queryString = "SELECT * FROM category where status =1"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
      // throw err
    }

    console.log("I think we fetched users successfully")

    const categories = rows.map((row) => {
      return {cat_name: row.name, cat_desc: row.description}
    })

    res.json(categories)
  })

  // res.end()
})

