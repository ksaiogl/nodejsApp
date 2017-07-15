var TAG = 'mongoDatabase.js';
var mongoClient =  require('mongodb').MongoClient;

var env = require('./env.js').env;
console.log(TAG + " " +"Deployment Environment is: " + env);

var dbConfig = {
    "prd":
    {
        "type": "replicaSet",
        "user": "msupply",
        "pwd": "supply123",
        "mongod": ["mongo1.msupply.com:27017","mongo2.msupply.com:27017"],
        "database": "my_DB"
    },

    "stg":
    {
        "type": "singleInstance",
        "user": "msupply",
        "pwd": "supply123",
        "mongod": ["mongo1.msupply:27017"],
        "database": "my_DB"
    },

    "dev":
    {
        "type" : "singleInstance",
        "user": "",
        "pwd": "",
        "mongod":["mongoDev.msupply:27017"],
        "database": "my_DB"
    },
    "demo":
    {
        "type" : "singleInstance",
        "user": "",
        "pwd": "",
        "mongod":["10.10.0.120:27017"],
        "database": "my_DB"
    },

    "loc":
    {
        "type": "singleInstance",
        "user": "",
        "pwd": "",
        "mongod": ["127.0.0.1:27017"],
        "database": "my_DB"
    }
};

var connParams = null;
if (env === 'prd') {
    connParams = dbConfig.prd;
} else if ( env === 'stg') {
    connParams = dbConfig.stg;
} else if ( env === 'dev') {
    connParams = dbConfig.dev;
}else if ( env === 'demo') {
    connParams = dbConfig.demo;
} else {
    connParams = dbConfig.loc;
}
var mongod = connParams.mongod;

var databaseURL = null;
var mongoDbConn = null;

var hosts = null;
for (var i=0; i<mongod.length; i++){
    if (i === 0) {
        hosts = mongod[0];
    }else {
        hosts = hosts + ',' + mongod[i];
    }
}

var dbConnUrl = null;
if (!( connParams.user === "" && connParams.pwd === "")) {
    dbConnUrl = 'mongodb://' + connParams.user + ':' + connParams.pwd + '@' + hosts + '/' + connParams.database;
    // dbConnUrl = 'mongodb://' + connParams.user + ':' + connParams.pwd + '@' + hosts + '/' + connParams.database + '?replicaSet=msupply&connectTimeoutMS=300000&socketTimeoutMS=300000';
    console.log(dbConnUrl);
} else {
    dbConnUrl = 'mongodb://' + hosts + '/' + connParams.database ;
}


exports.createMongoConn = function(callback) {

    mongoClient.connect(dbConnUrl,function (err, database) {
        if (err) {
            callback(err);
        } else {
            console.log('Connection established to: ', dbConnUrl);
            exports.mongoDbConn = database;
            callback(false);
        }
    });
}

//Export the connection
//module.exports = mongoDbConn;


/*Should be only used for sellerFloat Deletion*/
var dbDataLoaderUser = null;
if (env === 'prd') {
    dbDataLoaderUser = "mongodb://msupplyDataLoad:msupplyEngg123@mongo1.msupply.com:27017,mongo2.msupply.com:27017/msupplyDB";
} else if ( env === 'stg') {
    dbDataLoaderUser = "mongodb://msupplyDataLoad:msupplyEngg123@mongo1.msupply:27017/msupplyDB";
} else if ( env === 'dev') {
    dbDataLoaderUser = "mongodb://mongoDev.msupply:27017/msupplyDB";
}else if ( env === 'demo') {
    dbDataLoaderUser = "mongodb://10.10.0.120:27017/msupplyDB";
} else {
    dbDataLoaderUser = "mongodb://127.0.0.1:27017/msupplyDB";
}

exports.createMongoConnRemove = function(callback) {

    mongoClient.connect(dbDataLoaderUser,function (err, databaseRem) {
        if (err) {
            callback(true, err);
        } else {
            callback(false, databaseRem);
        }
    });
}
