// load our app server using express somehow....
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))
exports.app.get('/getCategoryProducts/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)
  
    const connection = mysql.createConnection({
      host: '192.168.64.2',
      user: 'helpkit',
      database: 'helpkit'
    })
  
    const catId = req.params.id
    const queryString = "SELECT * FROM product where category =?"
    connection.query(queryString, [catId], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
        // throw err
      }
  
      console.log("I think we fetched users successfully")
  
      const catProducts = rows.map((row) => {
        return {product_id:row.id, productName:row.name, productDesc:row.description, productOwner:row.owner_id, productMake:row.make, productModel:row.model, productYear:row.year, productInst:row.instructions, productLocation:row.location, productFeatures:row.featured,productURL:row.urlshare}
      })
  
      res.json(catProducts)
    })
  
    // res.end()
  })
  
  