#!/bin/bash

apachectl start

pm2 start -x /src/heartbeathandler.js --no-daemon
pm2 monit
