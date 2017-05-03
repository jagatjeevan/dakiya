var express = require('express')
var app = express()

app.use('/server', express.static('app/server'))
app.use('/', express.static('build'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})