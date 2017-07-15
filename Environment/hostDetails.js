//This file contains Hosting details(IP adress and PORT number) where application will be deployed.
var env = require('./env.js').env;

//Object that represent mysql hosts, port for all environments.
var hostDetails = {
	"prd": {
		"host": "nodejs2.msupply-internal.local",
		"port": "80"
	},
	"stg": {
		"host": "nodejs2.stg.msupply.com",
		"port": ""
	},
	"dev": {
		"host": "nodejs2.dev.msupply.com",
		"port": ""
	},
	"loc": {
		"host": "localhost",
		"port": "8083"
	}
}

//Object that represent magento hosts, port for all environments.
var MagentohostDetails = {
	"prd": {
		"host": "customer.msupply.com"
	},
	"stg": {
		"host": "staging.msupply.com"
	},
	"dev": {
		"host": "develop.msupply.com"
	},
	"loc": {
		"host": "localhost"
	}
}

//Object that represent angular js for all environments.
var webHostDetails = {
	"prd": {
		"host": "www.msupply.com",
		"port": ""
	},
	"stg": {
		"host": "stg.msupply.com",
		"port": ""
	},
	"dev": {
		"host": "dev.msupply.com",
		"port": ""
	},
	"demo": {
		"host": "demo.msupply.com",
		"port": ""
	},
	"loc": {
		"host": "localhost",
		"port": "8083"
	}
}

//Object that represent deployed node hosts, port for all environments.
var deployedHostDetails = {
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
		//"host": "nodejs-supplier.stg.msupply.com",
		"host": "localhost",
		"port": "8083"
	}
}

//Product host details.
var productHostDetails = {
	"prd": {
		"host": "nodejs-product.msupply-internal.local",
		"port": ""
	},
	"stg": {
		"host": "nodejs-product.stg.msupply-internal.local",
		"port": ""
	},
	"dev": {
		"host": "nodejs-product.dev.msupply-internal.local",
		"port": ""
	},
	"demo": {
		"host": "nodejs-product.demo.msupply-internal.local",
		"port": ""
	},
	"loc": {
		"host": "localhost",
		"port": ""
	}
}

var WHICH_HOST = null;			//variable which holds the host and port of existing environment.
var DEPLOYED_HOST = null;
var MAGENTO_HOST = null;
var WEB_HOST = null;
var PRODUCT_HOST = null;

if (env === 'prd') {
	WHICH_HOST = hostDetails.prd;
	DEPLOYED_HOST = deployedHostDetails.prd;
	MAGENTO_HOST = MagentohostDetails.prd;
	WEB_HOST = webHostDetails.prd;
	PRODUCT_HOST = productHostDetails.prd;
} else if ( env === 'stg') {
	WHICH_HOST = hostDetails.stg;
	DEPLOYED_HOST = deployedHostDetails.stg;
	MAGENTO_HOST = MagentohostDetails.stg;
	WEB_HOST = webHostDetails.stg;
	PRODUCT_HOST = productHostDetails.stg;
} else if ( env === 'dev') {
	WHICH_HOST = hostDetails.dev;
	DEPLOYED_HOST = deployedHostDetails.dev;
	MAGENTO_HOST = MagentohostDetails.dev;
	WEB_HOST = webHostDetails.dev;
	PRODUCT_HOST = productHostDetails.dev;
}
else if ( env === 'demo') {
	WHICH_HOST = hostDetails.demo;
	DEPLOYED_HOST = deployedHostDetails.demo;
	MAGENTO_HOST = MagentohostDetails.demo;
	WEB_HOST = webHostDetails.demo;
	PRODUCT_HOST = productHostDetails.demo;
} else {
	WHICH_HOST = hostDetails.loc;
	DEPLOYED_HOST = deployedHostDetails.loc;
	MAGENTO_HOST = MagentohostDetails.loc;
	WEB_HOST = webHostDetails.loc;
	PRODUCT_HOST = productHostDetails.loc;
}

exports.WHICH_HOST = WHICH_HOST;
exports.DEPLOYED_HOST = DEPLOYED_HOST;
exports.MAGENTO_HOST = MAGENTO_HOST;
exports.WEB_HOST = WEB_HOST;
exports.PRODUCT_HOST = PRODUCT_HOST;

//Object that represent TomCat hosts, port for all environments.
var tomcatHostDetails = {
	"prd": {
		"host": "http://tomcat.msupply.com",
		"port": "80"
	},
	"stg": {
		"host": "http://tomcat.stg.msupply.com",
		"port": "80"
	},
	"dev": {
		"host": "http://tomcat.dev.msupply.com",
		"port": "80"
	},
	"demo": {
		"host": "http://tomcat.demo.msupply.com",
		"port": "80"
	},
	"loc": {
		"host": "http://tomcat.stg.msupply.com",
		"port": "80"
	}
}

var HOST = null;			//variable which holds the host and port of existing Tomcat environment.

if (env === 'prd') {
	HOST = tomcatHostDetails.prd;
} else if ( env === 'stg') {
	HOST = tomcatHostDetails.stg;
} else if ( env === 'dev' || env === 'demo') {
	HOST = tomcatHostDetails.dev;
} else {
	HOST = tomcatHostDetails.loc;
}

exports.HOST = HOST;
