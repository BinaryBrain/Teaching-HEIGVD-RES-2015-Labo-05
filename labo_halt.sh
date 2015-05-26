#!/bin/bash

containers="res-frontend-run1 res-backend-run1"

echo "Stop containers"
docker stop $containers

echo
echo "Remove containers"
docker rm  $containers