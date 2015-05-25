
# Vagrant

## Preparation

    cd /my/labo
    vagrant up

## Connection

    vagrant ssh


 - Stop the VM: `vagrant halt`


# Docker

    cd /vagrant/docker
    docker build -t res/backend backend/


Test `docker run res/backend uname -a`

Run a docker `docker run -it -d --name backend1 res/backend`

Get the IP `docker inspect --format '{{ .NetworkSettings.IPAddress }}' backend1`
