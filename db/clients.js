var clients = [
    { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret' }
];
// http://localhost:3000/dialog/authorize?client_id=abc123&response_type=code&redirect_uri=http://localhost:3000/

exports.find = function(id, done) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.id === id) {
      return done(null, client);
    }
  }
  return done(null, null);
};

exports.findByClientId = function(clientId, done) {
  console.log('db.findByClientId', clientId);
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.clientId === clientId) {
      return done(null, client);
    }
  }
  return done(null, null);
};
