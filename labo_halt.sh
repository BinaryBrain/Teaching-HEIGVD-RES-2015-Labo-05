#!/bin/bash

containers="res-frontend-run1 res-frontend-run2 res-backend-run1 res-loadbalancer-run1"

echo "Stop containers"
docker stop $containers

echo
echo "Remove containers"
docker rm  $containers