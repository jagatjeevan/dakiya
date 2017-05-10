var express = require('express')
var utils = require('util')
var app = express()
var router = express.Router();

var data = {
  mountPath: process.env.DAKIYA_WEB_MOUNT || '/',
  port: process.env.DAKIYA_WEB_PORT || 3000,
  apiBaseURL: process.env.DAKIYA_WEB_API_BASE_URL || 'https://dakya.sameerazazi.com/api',
  xParseApplicationId: process.env.DAKIYA_WEB_XPARSE_APPLICATION_ID || 'oidulxirU3OBEXImbVWVHk6Gah5Bbdm2',
  xParseMasterKey: process.env.DAKIYA_WEB_XPARSE_MASTER_KEY || 'pZ7vQNqmK_lKAhWwCDMv29i30gMJk8CnyxTEJ2BfvhQd8nYea_RWC9chz6T5XJCK'
}

console.log(data);

router.use('/', express.static('build'))
router.use('/configvars.js', function (req, res) {
  res.set('Content-Type', 'text/javascript');
  var content = utils.format(`window.config = %s`, JSON.stringify(data));
  res.send(content);
});

console.log(data.mountPath);
app.use(data.mountPath, router);
app.listen(data.port, function () {
  console.log('Example app listening on port %d!', data.port)
})