#!/bin/bash

docker build -t res-frontend docker/frontend/
docker build -t res-backend docker/backend/
docker build -t res-loadbalancer docker/loadbalancer/
