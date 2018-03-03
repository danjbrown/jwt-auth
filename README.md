# JWT Authentication

A simple JWT authentication server built using Node.js and Express, it could be used to authenticate users in Angular2 applications.
Demonstrates a very basic example of authentication against users stored in a MongoDB; this will be extended.
Uses nodemon to automatically restart the server when code changes are saved.
Includes sample tests written using Mocha and Chai.

## Usage

1. Clone the repository
2. Install the dependencies `npm install`
3. Change the jwtSecretKey in `server.js`
4. Add an authentication check as required, for example from users in a database.
5. Start the server `nodemon server.js`
6. Make web service requests as described below; you could use Postman to experiment.
5. Run the tests `npm run test`

### MongoDB
The authenticate service assumes that a MongoDB is available with a collection containing one JSON document per user with these properties:

```
  {
    user: 'username',
    password: 'MD5 password'
  }
```

### Authenticate the user, create and return a JWT token

Create a POST request to http://localhost:8080/authenticate with a request body of the form:

```
  {
    username: 'Test User',
    password: 'password'
  }
```

Copy the token from the token property of the JSON response.

### Verify a token and retrieve the user data

Create a GET request to http://localhost:8080/user passing the token copied above in the header parameter Authorization with type Bearer: ```Bearer <copied_token>```

The response body should contain JSON like this, or an error message:

```
  {
    "success": true,
    "message": {
        "username": "Test User",
        "iat": 1503067717,
        "exp": 1503071317
    }
  }
```
