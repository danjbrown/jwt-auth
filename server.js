var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var jwt    		= require('jsonwebtoken');
var config 		= require('./config');

// JWT secret key
var jwtSecretKey = 'm~pXVNvmkzLe87=rN19';

// Server config
var port = process.env.PORT || 8080;
app.set('jwtSecretKey', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Authenticate the user and return the JWT token
app.post('/authenticate', function(req, res) {
	if (!req.body.username || !req.body.password) {
		res.status(400).json({success: false, message: 'Empty credentials'});
	}

	// validate the user credentials here
	var isValid = true;
	var user = req.body.username;

	if (isValid) {
		var tokenData = {
			username: user
		}

		var jwtToken = jwt.sign(tokenData, jwtSecretKey, {
			expiresIn: 3600
		});

		res.status(200).json({
			success: true,
			message: 'User authenticated',
			token: jwtToken
		});
	}
});

// Check if the user is authenticated
app.get('/is-authenticated', function(req, res) {
	// check header for authentication token
	var jwtToken = (req.headers.authorization || '').split(' ')[1] || '';

	if (jwtToken) {
		jwt.verify(jwtToken, jwtSecretKey, function(err, decoded) {			
			if (err) {	
				res.status(400).json({success: false, message: 'Authentication failed'});	
			} else {
				// return the decoded user data
				res.status(200).json({success: true, message: decoded});
			}
		});
	} else {
		res.status(400).json({success: false, message: 'Missing authorization token'});		
	}
});

app.listen(port);
console.log('JWT auth server running at http://localhost:' + port);
