
# Using scripts

go to the right folder (where Vagrantfile is)

    vagrant up
    vagrant ssh

    vagrant provision # to update from provision.sh

in vagrant

    cd /vagrant
    ./labo_build.sh
    ./labo_run.sh # Run the containers

go to http://192.168.42.42 to see the frontend container (backend: 192.168.42.42:3000)

Docker UI : http://192.168.42.42:9000

to stop `./labo_halt.sh`

----

# Vagrant

## Preparation

    cd /my/labo
    vagrant up

## Connection

    vagrant ssh


 - Stop the VM: `vagrant halt`


## Infos

VM Vagrant: 192.168.42.42


# Docker

    cd /vagrant/docker
    docker build -t res-backend backend/


Test `docker run res-backend uname -a`

Run a docker `docker run -it -d --name backend1 res-backend`

Get the IP `docker inspect --format '{{ .NetworkSettings.IPAddress }}' backend1`



## Docker Ui

    docker run -d -p 9000:9000 --privileged -v /var/run/docker.sock:/var/run/docker.sock dockerui/dockerui

and go to http://192.168.42.42:9000
