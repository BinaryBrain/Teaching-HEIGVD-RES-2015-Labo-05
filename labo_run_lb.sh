#!/bin/bash

docker run -it -d --name res-loadbalancer-run1 -p 8080:8080 res-loadbalancer
# docker run -it -d --name res-loadbalancer-run1 -p 80:80 res-loadbalancer

docker inspect --format '{{ .NetworkSettings.IPAddress }}' res-loadbalancer-run1