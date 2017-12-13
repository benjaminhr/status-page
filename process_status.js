const express = require('express')
const app = express()
const { exec } = require('child_process')

app.use(express.static('public'))

app.get('/status', (req,res) => {
  res.send('index')
})

exec('systemctl status nginx', (err,stdout,stderr) => {
  if (err) throw err

  let data = stdout
  console.log(data)
})

const port = process.env.PORT || 8001
app.listen(port)
