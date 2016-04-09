/**
 * Ripple Client Configuration
 *
 * Copy this file to config.js and edit to suit your preferences.
 */
var Options = {
  server: {
    "trusted"       : true,
    "local_signing" : true,

    servers: [
    	{ host: 's1.ripple.com', port: 443, secure: true },
      { host: 's-west.ripple.com', port: 443, secure: true },
      { host: 's-east.ripple.com', port: 443, secure: true }
    ],

    connection_offset: 1
  },
  blobvault : "https://blobvault.ripple.com",

  transactions_per_page : 50,
  persistent_auth : false,

  // Configure bridges
  bridge: {
    out: {
      "bitcoin": "https://www.snapswap.us/api/v1/bridge"
    }
  },

  zipzap: {
    "requester": "/zipzap/request.php"
  },

  mixpanel: {
    "token": '70136cced28d5ac6831467111fdbc8a5',
    // Don't track events by default
    "track": false
  }
};

// Load client-side overrides
if (store.enabled) {
  var settings = JSON.parse(store.get('ripple_settings') || "{}");

  if (settings.server && settings.server.servers) {
    Options.server.servers = settings.server.servers;
  }

  Options.server.servers = Options.server.servers.map(function (server) {
    server.host = server.host.replace(/s_(west|east)/, 's-$1');
    return server;
  });

  if (settings.blobvault) {
    Options.blobvault = settings.blobvault;
    if (Options.blobvault.substr(0, 29) === 'https://blobvault.payward.com') {
      Options.blobvault = 'https://blobvault.ripple.com';
    }
  }

  if (settings.mixpanel) {
    Options.mixpanel = settings.mixpanel;
  }
}