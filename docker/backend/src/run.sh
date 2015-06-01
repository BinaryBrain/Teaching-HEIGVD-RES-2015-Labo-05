#!/bin/bash

# node /src/heartbeat.js &
# node /src/index.js -DFOREGROUND

pm2 start /src/heartbeat.js
pm2 start -x /src/index.js --no-daemon
pm2 monit
