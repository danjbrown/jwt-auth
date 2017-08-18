# JWT Authentication

A basic example of JWT authentication with Node.js and Express. Uses nodemon to automatically restart the server when code changes are saved.

## Usage

1. Clone the repo: `git clone git@github.com:scotch-io/node-token-authentication`
2. Install dependencies: `npm install`
3. Change the jwtSecretKey in `server.js`
4. Add an authentication method as required, for example from a database
5. Start the server: `nodemon server.js`
6. Make web service requests as described below; you could use Postman to experiment.

### Authenticate the user, create and return a JWT token

Create a POST request to http://localhost:8080/authenticate

```
  {
    name: 'Test User',
    password: 'password'
  }
```

Copy the token from the token property of the JSON response.

### Verifying a token an retrieve the user data

Create a GET request to http://localhost:8080/is-authenticated passing the token copied above in the header parameter Authorization.

You should see a JSON response like this, or an error message:

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
