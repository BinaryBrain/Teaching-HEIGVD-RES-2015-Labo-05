# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "hashicorp/precise32"
  config.vm.network "private_network", ip: "192.168.42.42"

  config.vm.provision "shell", path: "provision.sh", privileged: false

  config.ssh.forward_x11 = true

  #config.vm.network "forwarded_port", guest: 80, host: 8080
  #docker.ports = ['80:80', '443:443', '3000:3000']

  #config.vm.provider "virtualbox" do |v|
  #  v.memory = 1024
  #  v.cpus = 2
  #end

end
