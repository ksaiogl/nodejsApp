//This file contains Hosting details(IP adress and PORT number) where application will be deployed.
var env = require('./env.js').env;

//Object that represent mysql hosts, port for all environments.
var hostDetails = {
	"prd": {
		"host": "nodejs-supplier.msupply-internal.local",
		"port": "80"
	},
	"stg": {
		"host": "nodejs-supplier.stg.msupply-internal.local",
		"port": "8081"
	},
	"dev": {
		"host": "nodejs-supplier.dev.msupply-internal.local",
		"port": "8082"
	},
	"demo": {
		"host": "nodejs-supplier.demo.msupply-internal.local",
		"port": "8080"
	},
	"loc": {
		"host": "localhost",
		"port": "8083"
	}
}

var WHICH_HOST = null;			//variable which holds the host and port of existing environment.

if (env === 'prd') {
	WHICH_HOST = hostDetails.prd;
} else if ( env === 'stg') {
	WHICH_HOST = hostDetails.stg;
} else if ( env === 'dev') {
	WHICH_HOST = hostDetails.dev;
} else if ( env === 'demo') {
	WHICH_HOST = hostDetails.demo;
} else {
	WHICH_HOST = hostDetails.loc;
}

exports.WHICH_HOST = WHICH_HOST;
