const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { exec } = require('child_process')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/status', (req,res) => {
  res.sendFile('index')
})

app.get('/api/status', (req,res) => {
  let data = {};

  exec('systemctl status nginx', (err,stdout,stderr) => {
    if (err) throw err

    data['nginx'] = stdout
  })

  exec('systemctl status mysql', (err,stdout,stderr) => {
    if (err) throw err

    data['mysql'] = stdout
  })

  res.json(data)
})

const port = process.env.PORT || 8001
app.listen(port)
