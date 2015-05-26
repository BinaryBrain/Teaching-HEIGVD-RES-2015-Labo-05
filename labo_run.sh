#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)
green=$(tput setaf 2)

function containerIp {
	echo "${bold}IP $1: ${green}"
	docker inspect --format '{{ .NetworkSettings.IPAddress }}' $1
	echo "${normal}"
}


# docker run -it -d --name res-frontend1 res-run-frontend
docker run -d --name res-frontend-run1 -p 80:80 res-frontend


# docker run -it -d --name res-backend1 res-run-backend
docker run -d --name res-backend-run1 -p 3000:3000 res-backend node index.js


# Containers IP
containerIp res-frontend-run1
containerIp res-backend-run1



# docker run res-backend node index.js