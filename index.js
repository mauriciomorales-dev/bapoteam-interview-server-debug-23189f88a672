/**
 * Live Function
 *
 * When pushing live, this needs to be uncommented
 */

// console.log('process', process.env);
// let's set some environment variables
if (process.env.ENV && process.env.ENV === 'live') {
	/**
	 * AWS Lambda Setup
	 * 
	 */
	 const binaryMimeTypes = [
		'application/javascript',
		'application/json',
		'application/octet-stream',
		'application/xml',
		'font/eot',
		'font/opentype',
		'font/otf',
		'image/jpeg',
		'image/png',
		'image/svg+xml',
		'text/comma-separated-values',
		'text/css',
		'text/html',
		'text/javascript',
		'text/plain',
		'text/text',
		'text/xml'
	]
	const config = require('./function/config/config');
	const app = require('./function/config/express');
	const awsServerlessExpress = require('aws-serverless-express');

	const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
	module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
} else {
	/**
	 * When testing your function on your local node server
	 * uncomment the code below
	 */
	const config = require('./function/config/config');
	const app = require('./function/config/express');
	const http = require('http');
	const https = require('https');
	const fs = require('fs');

	let options = {
		key: fs.readFileSync('server.key'),
		cert: fs.readFileSync('server.crt')
	};
	http.createServer(app).listen(config.port, () => {
		console.log('http server connected');
	});
	https.createServer(options, app).listen(443, () => {
		console.log('ssl server connected');
	});
}