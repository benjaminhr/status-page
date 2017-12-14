const nginx = document.getElementById('nginx')
const mysql = document.getElementById('mysql')
const pm2 = document.getElementById('pm2')
const currentUrl = window.location.href

fetch(currentUrl + 'api/status')
  .then(data => data.json())
  .then(json => {
    let mainStatus = []
    let mysqlData = json['mysql']
    let nginxData = json['nginx']
    let pm2Data = json['pm2']

    pm2.innerText = pm2Data.replace('Use `pm2 show <id|name>` to get more details about an app', '')
    mysql.innerText = mysqlData
    nginx.innerText = nginxData

    if  (nginxData.includes('active (running)')) {
      let status = document.getElementById('n-result')
      status.innerText = 'up'
      mainStatus.push('up')
    } else {
      let status = document.getElementById('n-result')
      status.style.color = 'tomato'
      status.innerText = 'down'
      mainStatus.push('down')
    }

    if (mysqlData.includes('active (running)')) {
      let status = document.getElementById('m-result')
      status.innerText = 'up'
      mainStatus.push('up')
    } else {
      let status = document.getElementById('m-result')
      status.style.color = 'tomato'
      status.innerText = 'down'
      mainStatus.push('down')
    }

    if (pm2Data.includes('errored') || pm2Data.includes('stopped')) {
      let status = document.getElementById('p-result')
      status.innerText = 'down'
      status.style.color = 'tomato'
      mainStatus.push('down')
    } else {
      let status = document.getElementById('p-result')
      status.innerText = 'up'
      mainStatus.push('up')
    }

    if (mainStatus.includes('down')) {
      let status = document.getElementById('main-status')
      status.style.color = 'tomato'
    } else {
      let status = document.getElementById('main-status')
      status.style.color = '#00cc00'
    }

  })
