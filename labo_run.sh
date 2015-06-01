#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)
green=$(tput setaf 2)

# Run docker
function run {
	echo "${bold}$1: "
	docker run -d --name "$1-$2" -p $3:$4 $1
	containerIp "$1-$2"
}

# Docker ip
function containerIp {
	echo "IP $1: ${green}"
	docker inspect --format '{{ .NetworkSettings.IPAddress }}' $1
	echo "${normal}"
}


# Frontend
# docker run -d --name res-frontend-run1 -p 80:80 res-frontend
run res-frontend run1 80 80
run res-frontend run2 9999 80

# Backend
run res-backend run1 3000 3000


# docker run res-backend node index.js
# docker exec -it res-loadbalancer-run1 bash