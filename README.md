<div style="text-align:center;">

[![pipeline status](https://gitlab.webonize.net/remskarzan/mydoggo/badges/master/pipeline.svg)](https://gitlab.webonize.net/remskarzan/mydoggo/-/commits/master)

</div>

ON UBUNTU 16.04 installation

sudo apt-get update
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
   
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose


nodejs -v
npm -v
docker-compose --version

//git clone this project
npm install -g npm@latest

//npm install both app and api
npm i -g @ionic/cli
npm i -g cordova
npm i -g cordova-res
ionic cordova resources android

JAVA JDK 8
-go to site, inspect copy nexturl. change otn => otn-pub. It will download it
