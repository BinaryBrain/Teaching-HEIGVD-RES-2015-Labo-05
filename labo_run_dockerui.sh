#!/bin/bash

echo "Run dockerui"

docker run -d -p 9000:9000 --privileged -v /var/run/docker.sock:/var/run/docker.sock dockerui/dockerui

echo "you can go on http://192.168.42.42:9000"