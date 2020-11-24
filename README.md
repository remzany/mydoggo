<div style="text-align:center;">

[![pipeline status](https://gitlab.webonize.net/remskarzan/mydoggo/badges/master/pipeline.svg)](https://gitlab.webonize.net/remskarzan/mydoggo/-/commits/master)

</div>

ON UBUNTU 16.04 installation

sudo apt-get update
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm

sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

nodejs -v
npm -v
docker-compose --version

git clone this project, npm install both app and api

npm install -g npm@latest
