const express 			= require('express');
const app         		= express();
const bodyParser  		= require('body-parser');
const jwt    			= require('jsonwebtoken');
const expressValidator  = require('express-validator');
const mongoDB           = require('./mongodb');
const crypto            = require('crypto');

// Constants
const jwtSecretKey          = 'm~pXVNvmkzLe87=rN19';
const databaseUrl           = 'mongodb://localhost:27017';
const databaseName          = 'myProject';
const databaseCollection    = 'users';

// Server config
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

// Authenticate the user and return the JWT token
app.post('/authenticate', function(req, res) {
    // validate input
    req.checkBody('username', 'Invalid username').isAlphanumeric();
    req.checkBody('password', 'Invalid password').isAlphanumeric();

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.status(400).json({success: false, message: result.array()});
        } else {
            // Connect to the MongoDB and authenticate the user
            const mongoDatabase = new mongoDB(databaseUrl, databaseName, databaseCollection);
            return mongoDatabase.connect().then(() => {
                const md5Password = crypto.createHash('md5').update(req.body.password).digest("hex");
                return mongoDatabase.findUser(req.body.username, md5Password);
            }).then((user) => {
                if (user.length === 1) {
                    const tokenData = {
                        username: req.body.username
                    }

                    const jwtToken = jwt.sign(tokenData, jwtSecretKey, {
                        expiresIn: 3600
                    });

                    res.status(200).json({
                        success: true,
                        message: 'User authenticated',
                        token: jwtToken
                    });
                    Promise.resolve();
                }
                return Promise.reject();
            }).catch((error) => {
                console.error(error);
                res.status(400).json({success: false, message: 'Invalid login'});
            });
        }
    });
});

// Check if the user is authenticated and return the decoded user data
app.get('/user', function(req, res) {
    // check header for authorization token
    const jwtToken = (req.headers.authorization || '').split(' ')[1] || '';

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

module.exports = app; // for testing
