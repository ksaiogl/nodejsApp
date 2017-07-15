var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongo = require('./Environment/mongoDatabase.js')
//var mongo = require('./Environment/redis.js')
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();

var app = express();

app.use(cookieParser());
/*app.use(session({
    secret: "Shh, its a secret!",
    resave: false,
              saveUninitialized: true
}));*/

//var redisConfigFile = require('./Environment/redis.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));
    //console.log("req.session 1: "+JSON.stringify(req.session))
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client}),
    saveUninitialized: false,
    resave: false
}));
    //console.log("req.session 2: "+JSON.stringify(req.session))





/*redisConfigFile.createRedisConn(function(err) {
    if (!err) {
      console.log("redis successfully")
        app.use(session({
            secret: redisConfigFile.getSessionEncryptionKey(env),
            // create new redis store.
            store: new redisStore({
                client: redisConfigFile.redisConn,
                ttl: 60 * 30
            }),
            saveUninitialized: false,
            resave: false,
            name: 'connect.cid',
            cookie: {
                secure: false,
                maxAge: null,
                SameSite: false //domain:'.msupply.com'
            }
        }));

        var redis = redisConfigFile.redisConn;*/
        var customer = require('./routes/customer/customer.js');

        app.use('/customer', customer);

        app.use(function(err, req, res, next) {
            console.log(JSON.stringify(req.body))
            res.status(err.status || 500);
            res.json({
                http_code: err.status || 500,
                message: err.message
            });
            console.log("req:- " + req.url);
            console.log("time : " + new Date());
            console.log("error triggered from app.js:- " + err.stack);
        });

        app.get('/', function(req, res) {
            var message = ''
            console.log("req.session: " + JSON.stringify(req.session))
            console.log("req.cookies: " + JSON.stringify(req.cookies))
            if (req.session.page_views) {
                req.session.page_views++;
                message = message + "You visited this page " + req.session.page_views + " times\n"
            } else {
                req.session.page_views = 1;
                message = message + "Welcome to this page for the first time!\n"
            }
            if (req.session.page_count) {
                req.session.page_count++;
                message = message + "You visited this page 2 " + req.session.page_count + " times"
            } else {
                req.session.page_count = 1;
                message = message + "Welcome to this page 2 for the first time!"
            }
            console.log("===============================================")
            console.log("req.session: " + JSON.stringify(req.session))
            console.log("req.cookies: " + JSON.stringify(req.cookies))

            res.send(message)
        });

        mongo.createMongoConn(function(err) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', JSON.stringify(err));
            } else {
                app.listen(3000, function() {
                    console.log("listening on 3000")
                });
            }
        })
   /* } else {
      console.log("error connecting redis: "+ JSON.stringify(err))
    }
});*/