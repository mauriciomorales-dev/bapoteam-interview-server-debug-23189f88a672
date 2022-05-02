const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const routes = require('../routes/index.route');
const testCtrl = require('../controllers/test.controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress({ threshold: 0 }));
app.use(methodOverride());
app.use(cors());

/**
 *  This is where we set the store variable that should be on every lambda endpoint
 */
app.use('/', routes);

/**
 * Default error response
 */
app.use('*', (req, res, next) => {
	// for specific cloudwatch events we have to direct them directly to the function
	if (req.headers['x-apigateway-event']) {
		testCtrl.get(req, res);
	} else {
		console.log('error', req, res);
		res.send({
			error: true
		})
	}
});

module.exports = app;