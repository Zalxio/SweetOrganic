const { OAuth2Server } = require('oauth2-server');
const Request = require('oauth2-server').Request;
const Response = require('oauth2-server').Response;

// Replace this with your database logic if needed
const clients = [
  {
    clientId: 'client_id_1',
    clientSecret: 'client_secret_1',
    grants: ['password'],
  },
];

const users = [
  {
    username: 'user1',
    password: 'password1',
    id: 'user_id_1',
    scope: 'read write',
    grants: ['password'],
    // Add more user properties as needed
    // ...
  },
];

// Initialize the OAuth2 server
const oauth2Server = new OAuth2Server({
  model: {
    getAccessToken: (token) => {
      // Replace this with your token retrieval logic
      return { accessToken: token, accessTokenExpiresAt: new Date(), scope: 'read write', client: {} };
    },
    getClient: (clientId, clientSecret) => {
      // Replace this with your client retrieval logic
      return clients.find((client) => client.clientId === clientId && client.clientSecret === clientSecret);
    },
    getUser: (username, password) => {
      // Replace this with your user retrieval and password validation logic
      return users.find((user) => user.username === username && user.password === password);
    },
    saveToken: (token, client, user) => {
      // Replace this with your token storage logic
      return { accessToken: token.accessToken, client: client, user: user };
    },
  },
});

// Define an OAuth2 middleware
function authenticateOAuth2(req, res, next) {
  const request = new Request(req);
  const response = new Response(res);

  return oauth2Server.authenticate(request, response)
    .then(() => {
      req.user = request.user;
      next();
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
}

module.exports = {
  oauth2Server,
  authenticateOAuth2,
};
