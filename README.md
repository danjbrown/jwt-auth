# JWT Authentication

A simple JWT authentication server using Node.js and Express, this could be used to authenticate users in Angular2 applications. Uses nodemon to automatically restart the server when code changes are saved.

## Usage

1. Clone the repository
2. Install the dependencies `npm install`
3. Change the jwtSecretKey in `server.js`
4. Add an authentication method as required, for example from a database
5. Start the server `nodemon server.js`
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

### Verify a token and retrieve the user data

Create a GET request to http://localhost:8080/user passing the token copied above in the header parameter Authorization with type Bearer: ```Bearer token```

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
