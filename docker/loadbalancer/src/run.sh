#!/bin/bash

# pm2 start -x /src/heartbeathandler.js --no-daemon
node /src/heartbeathandler.js -DFOREGROUND
# pm2 monit
# pm2 start /src/heartbeathandler.js
