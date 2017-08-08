// Example express application adding the parse-server module to expose Parse
// compatible API routes.
const express        = require('express');
const ParseServer    = require('parse-server').ParseServer;
const path           = require('path');
const utils          = require('util');
const ParseDashboard = require('parse-dashboard');


// Parse configuration
const PORT            = process.env.PORT || 1337;
const DATABASE_URI    = process.env.DATABASE_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/dakiya';
const SERVER_URL      = process.env.SERVER_URL || 'http://localhost:1337/parse';
const APP_ID          = process.env.APP_ID || 'myAppId';
const MASTER_KEY      = process.env.MASTER_KEY || 'myMasterKey';
const APP_NAME        = process.env.APP_NAME || 'dakiya';
const PARSE_MOUNT     = process.env.PARSE_MOUNT || '/parse';
const CLOUD_CODE_MAIN = process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js';

// Database Ecosystem file
if (!DATABASE_URI) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
}

let ServerConfig = {
    databaseURI     : DATABASE_URI,
    cloud           : CLOUD_CODE_MAIN,
    appId           : APP_ID,
    masterKey       : MASTER_KEY,
    serverURL       : SERVER_URL,
    verifyUserEmails: false,
    publicServerURL : SERVER_URL,
    appName         : APP_NAME,
    liveQuery       : {
        classNames: ['Posts', 'Comments']
    }
};


// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

// Start Parse Server
const api = new ParseServer(ServerConfig);
const app = express();

// Serve static assets from the /public folder
// app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = PARSE_MOUNT;
app.use(mountPath, api);

// Mount dakiya web app on root path
// app.use('/', express.static(path.join(__dirname, '/build')));

var data = {
  mountPath: process.env.DAKIYA_WEB_MOUNT || '/',
  apiBaseURL: PARSE_MOUNT,
  xParseApplicationId: APP_ID
}

app.get('/configvars.js', function (req, res) {
  res.set('Content-Type', 'text/javascript');
  var content = utils.format(`window.config = %s`, JSON.stringify(data));
  res.send(content);
});

// Parse Dashboard
const DASHBOARD_MOUNT    = process.env.DASHBOARD_MOUNT || '/admin';
const DASHBOARD_USER     = process.env.DASHBOARD_USER;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;
if (DASHBOARD_USER) {
  console.log('registering parse dashboard...', DASHBOARD_MOUNT)
    const dashboard = new ParseDashboard({
        apps       : [
            {
                appName  : APP_NAME,
                serverURL: SERVER_URL,
                appId    : APP_ID,
                masterKey: MASTER_KEY,
                iconName : ''
            }
        ],
        users      : [
            {
                user: DASHBOARD_USER, // Used to log in to your Parse Dashboard
                pass: DASHBOARD_PASSWORD
            }
        ],
        iconsFolder: 'icons'
    }, true);

    // make the Parse Dashboard available at /admin
    app.use(DASHBOARD_MOUNT, dashboard);
}

const httpServer = require('http').createServer(app);
httpServer.listen(PORT, () => console.log('parse-server-example running on port ' + PORT + '.'));

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);