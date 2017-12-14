const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const auth = require('basic-auth')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/api/status', (req,res) => {
    let data = {};

    const sendData = function() {
      res.json(data)
    }

    exec('service nginx status', (err,stdout,stderr) => {
      if (err) throw err
      data['nginx'] = stdout
     })

    exec('service nginx status', (err,stdout,stderr) => {
      if (err) throw err
      data['mysql'] = stdout
    })

    exec('pm2 list', (err,stdout,stderr) => {
      if (err) throw err
      data['pm2'] = stdout
      sendData()
    })
})

const port = process.env.PORT || 9000
app.listen(port)
