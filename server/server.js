'use strict';
/* jshint strict: false */
var config       = require('config.json')('./config/config.json', 'development');
const nodemailer = require('nodemailer');
validateConfigEnv();

var express     = require('express');
var app         = express();
var router      = express.Router();
var bodyParser  = require('body-parser');
var port        = process.env.PORT || config.server.port;
var db          = require('./db/db.js')(config);
var requireList = config.api.modules;
var write       = require('write');
var util        = require('util');

// Confgirure Routes
router.use(log); // Must precede router files
router.get('/', apiName);
requireList.forEach(function logArrayElements(element, index, array) {
	console.log(index + ' ' + element);
	require(element)(router, db, config);
});

// Confgirure Static File Service
app.use(express.static(__dirname + config.server.htmlRoot));
// Configure POST Data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Run Web Service
app.use('/' + config.api.path, router);
app.listen(port);

startupCompleteBanner();


function apiName(req, res) {
	res.json({ api: config.api.name });
}

function log(req, res, next) {
	// Middleware: use for authNZ, data validation, use analysis, stats
	var d = new Date();
	console.log('event', req.connection.remoteAddress.substring(7), req.url);
	write('C:\\Users\\hallrogera\\Documents\\logs\\' + req.connection.remoteAddress.substring(7) + '\\' + d.valueOf() + '.txt',  req.url);
	next();
}

function startupCompleteBanner() {
	var date = new Date();
	console.log('\n ' + config.app.name + ' ' + config.app.version + ' copyright ' + (1900 + date.getYear()) + ' ' + config.app.copyright);
	console.log(' Started ' + date.toDateString() + ' ' + date.toTimeString());
	console.log(' Server ' + config.server.domain + ':' + config.server.port);

}

function validateConfigEnv() {
	if (!("db" in config)) { console.log('\nConfiguration file not loaded properly.'); process.exit(); }
}

/*
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rogerhall68@gmail.com',
        pass: ''
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Roger Hall" <rogerhall68@gmail.com>', // sender address
    to: 'rahall2@uams.edu', // list of receivers
    subject: 'Hello world', // Subject line
    text: 'Hello world', // plain text body
    html: '<b>Hello world</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
*/
