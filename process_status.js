const express = require('express')
const app = express()
const { exec } = require('child_process')

app.use(express.static('public'))

app.get('/status', (req,res) => {
  res.render('index')
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
})

const port = process.env.PORT || 8001
app.listen(port)
