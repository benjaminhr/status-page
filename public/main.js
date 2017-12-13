const root = document.getElementById('data')
const currentUrl = window.location.href

fetch(currentUrl + '/api/status')
  .then(data => data.json())
  .then(json => {
    root.innerText = json
  })
