// Import Modules

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');

// Twilio Credentials

const accountSid = 'AC600982e13d4dcbb82cf7daba17df346c';
const authToken = '8c30bb714ba53ec346f41f89af9aeccc';
const client = require('twilio')(accountSid, authToken);
app.use(bodyParser.urlencoded({ entended: false }));
var env= require('dotenv').config()

// Watson Credentials

var assistant = new watson.AssistantV1({
  iam_apikey: 'wfXbQhfsLKWiaMuxZSiyodDF2Wxcu9maLuXXNwmsCNZD',
  version: '2018-09-20',
  url: 'https://gateway-syd.watsonplatform.net/assistant/api'
});
var context1 = {};
app.get('/test', function (req, res) {
})
// API

app.post('/api', function (req, res) {
	console.log("Request Object");
	var From = req.body.From;
	console.log(From);
	assistant.message({
		workspace_id: 'afff6af9-cd26-4644-96d9-00d6acbc6668',
		input: { 'text': req.body.Body },
		context: context1
	}, function (err, response) {
		if (err)
			console.log('error:', err);
		else {
				context1 = response.context;
				var msg = response.output.text[0];
				console.log("message", msg);
				client.messages
					.create({
						body: msg,
						from:'whatsapp:+14155238886',
						to: From
					})
					.then(message => console.log(msg))
					.done();

	}
	})

});
//PORT Listen 
app.listen(process.env.PORT||8000, function () {
	console.log("Server is running at 8000");
});

