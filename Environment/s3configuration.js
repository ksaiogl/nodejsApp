//This file contains Hosting details(IP adress and PORT number) where application will be deployed.
var env = require('./env.js').env;

//Object that represent s3 bucket names for all different environments.
var bucketName = {
	"prd": {
		"s3BucketName": "msupplyrfq",
		"s3BucketNameSeller" : "msupplyselleronboarding",
		"s3BucketNamePurchaseOrder" : "msupplypurchaseorder",
		"s3BucketNameCustomer" : "msupplycustomer",
		"s3BucketNameInvoicePayments" : "msupplyinvoicepayments",
	},
	"stg": {
		"s3BucketName": "rfqtest",
		"s3BucketNameSeller" : "selleronboardingtest",
		"s3BucketNamePurchaseOrder" : "purchaseorder-stg1",
		"s3BucketNameCustomer" : "customer-stg1",
		"s3BucketNameInvoicePayments" : "msupplyinvoicepayments-stg",
	},
	"dev": {
		"s3BucketName": "rfqtest",
		"s3BucketNameSeller" : "selleronboardingtest",
		"s3BucketNamePurchaseOrder" : "purchaseorder-stg1",
		"s3BucketNameCustomer" : "customer-dev1",
		"s3BucketNameInvoicePayments" : "msupplyinvoicepayments-stg",
	},
	"demo": {
		"s3BucketName": "msupplyrfqdemo",
		"s3BucketNameSeller" : "msupplyselleronboardingdemo",
		"s3BucketNamePurchaseOrder" : "msupplypurchaseorderdemo",
		"s3BucketNameCustomer" : "customer-demo1",
		"s3BucketNameInvoicePayments" : "msupplyinvoicepaymentsdemo1",
	},
	"loc": {
		"s3BucketName": "rfqtest",
		"s3BucketNameSeller" : "selleronboardingtest",
		"s3BucketNamePurchaseOrder" : "purchaseorder-stg1",
		"s3BucketNameCustomer" : "customer-dev1",
		"s3BucketNameInvoicePayments" : "msupplyinvoicepayments-stg",
	}
}

var BUCKET_NAME = null;			//variable which holds the s3 bucket name of existing environment.
var BUCKET_NAME_Seller = null;
var BUCKET_NAME_PurchaseOrder = null;
var BUCKET_NAME_Customer = null;

if (env === 'prd') {
	BUCKET_NAME = bucketName.prd.s3BucketName;
	BUCKET_NAME_Seller = bucketName.prd.s3BucketNameSeller;
	BUCKET_NAME_PurchaseOrder = bucketName.prd.s3BucketNamePurchaseOrder;
	BUCKET_NAME_Customer = bucketName.prd.s3BucketNameCustomer;
	BUCKET_NAME_InvoicePayments = bucketName.prd.s3BucketNameInvoicePayments;
} else if ( env === 'stg') {
	BUCKET_NAME = bucketName.stg.s3BucketName;
	BUCKET_NAME_Seller = bucketName.stg.s3BucketNameSeller;
	BUCKET_NAME_PurchaseOrder = bucketName.stg.s3BucketNamePurchaseOrder;
	BUCKET_NAME_Customer = bucketName.stg.s3BucketNameCustomer;
	BUCKET_NAME_InvoicePayments = bucketName.stg.s3BucketNameInvoicePayments;
} else if ( env === 'dev') {
	BUCKET_NAME = bucketName.dev.s3BucketName;
	BUCKET_NAME_Seller = bucketName.dev.s3BucketNameSeller;
	BUCKET_NAME_PurchaseOrder = bucketName.dev.s3BucketNamePurchaseOrder;
	BUCKET_NAME_Customer = bucketName.dev.s3BucketNameCustomer;
	BUCKET_NAME_InvoicePayments = bucketName.dev.s3BucketNameInvoicePayments;
}else if ( env === 'demo') {
	BUCKET_NAME = bucketName.demo.s3BucketName;
	BUCKET_NAME_Seller = bucketName.demo.s3BucketNameSeller;
	BUCKET_NAME_PurchaseOrder = bucketName.demo.s3BucketNamePurchaseOrder;
	BUCKET_NAME_Customer = bucketName.demo.s3BucketNameCustomer;
	BUCKET_NAME_InvoicePayments = bucketName.demo.s3BucketNameInvoicePayments;
} else {
	BUCKET_NAME = bucketName.loc.s3BucketName;
	BUCKET_NAME_Seller = bucketName.loc.s3BucketNameSeller;
	BUCKET_NAME_PurchaseOrder = bucketName.loc.s3BucketNamePurchaseOrder;
	BUCKET_NAME_Customer = bucketName.loc.s3BucketNameCustomer;
	BUCKET_NAME_InvoicePayments = bucketName.loc.s3BucketNameInvoicePayments;
}

exports.BUCKET_NAME = BUCKET_NAME;
exports.BUCKET_NAME_Seller = BUCKET_NAME_Seller;
exports.BUCKET_NAME_PurchaseOrder = BUCKET_NAME_PurchaseOrder;
exports.BUCKET_NAME_Customer = BUCKET_NAME_Customer;
exports.BUCKET_NAME_InvoicePayments = BUCKET_NAME_InvoicePayments;
