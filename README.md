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


JAVA JDK 8: Go to site, inspect copy nexturl. change otn => otn-pub. It will download it
Gradle: download it from site (dont forget to add gradle to path).
add java SDK to path: variable name: "ANDROID_SDK_ROOT", location: "C:\Users\Uporabnik\AppData\Local\Android\Sdk"
Licences for sdk manager, go to this location: "C:\Users\Uporabnik\AppData\Local\Android\Sdk\tools\bin" and run "./sdkmanager.bat --licenses"

ionic cordova prepare android

Errors that you maybe will be facing:

- Source path does not exist: resources/android/xml/network_security_config.xml
    fix:
    1. Create folder at path: resources/ android/ xml/network_security_config.xml
    2. add below code to file:

    <?xml version="1.0" encoding="utf-8"?>
    <network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
    </domain-config>
    </network-security-config>

- Error: Manifest merger failed, uses-sdk:minSdkVersion 19 cannot be smaller than version 22 declared in library
    1. change capacitor.config.json, "android-minSdkVersion": "19" => to errors number
    2. change config.xml, <preference name="android-minSdkVersion" value="19" /> => to errors number

