const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const auth = require('basic-auth')
const helmet = require('helmet')
const config = require('./config.js')

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
  let credentials = auth(req)

  if (!credentials || credentials.name != config.user || credentials.pass != config.password) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('not your day today huh')
  } else {
    res.sendFile(__dirname + '/public/status.html')
  }
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
