#!/bin/bash

pm2 start -x /src/heartbeathandler.js --no-daemon
# pm2 start /src/heartbeathandler.js
