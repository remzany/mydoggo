echo "--> Rebuilding the rpm database"
rpmdb --rebuilddb 1> /dev/null
echo "--> Updating the system . . . ."
yum update -y 1> /dev/null
echo "--> Rebuilding the rpm database"
rpmdb --rebuilddb 1> /dev/null
echo "--> Installing . . .      . . . sudo"
yum install -y sudo 1> /dev/null
echo "--> Installing . . .      . . . git"
yum install -y git 1> /dev/null
echo "--> Installing . . .      . . . gcc"
yum install -y gcc 1> /dev/null
echo "--> Installing . . .      . . . gcc-c++"
yum install -y gcc-c++ 1> /dev/null
echo "--> Installing . . .      . . . make"
yum install -y make 1> /dev/null

echo "--> Adding repository . . . . . NodeJS 12.x"
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash - 1> /dev/null
echo "--> Adding repository . . . . . yarn"
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo 1> /dev/null
yum update -y 1> /dev/null
echo "--> Installing . . .      . . . nodejs"
yum install -y nodejs 1> /dev/null
SPACE4='    '
if [[ $(node --version) =~ ^v12\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
  printf "${SPACE4}|_ NodeJS installed . . . . "
  node --version
else
  echo "/!\ Failed to install NodeJS v12.x !"
  exit 1
fi
echo "--> Installing . . .      . . . yarn"
yum install -y yarn 1> /dev/null
if [[ $(yarn --version) =~ ^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}$ ]]; then
  printf "${SPACE4}|_ Yarn installed . . . . . "
  yarn --version
else
  echo "/!\ Failed to install YARN !"
  exit 1
fi

#
# POST INSTALL
# START PACKAGING
#

export BUILD_ROOT=${CI_PROJECT_DIR}/gitlab-ci/build/android
echo "--> Setting env var . . . . . . BUILD_ROOT . . .        . . . $BUILD_ROOT"
export CI_ROOT=${CI_PROJECT_DIR}
echo "--> Setting env var . . . . . . CI_ROOT . . .           . . . $CI_ROOT"

export ANDROID_COMPILE_SDK=28
echo "--> Setting env var . . . . . . ANDROID_COMPILE_SDK . . . . . $ANDROID_COMPILE_SDK"
export ANDROID_BUILD_TOOLS=28.0.2
echo "--> Setting env var . . . . . . ANDROID_BUILD_TOOLS . . . . . $ANDROID_BUILD_TOOLS"
export ANDROID_SDK_TOOLS=4333796
echo "--> Setting env var . . . . . . ANDROID_SDK_TOOLS . . . . . . $ANDROID_SDK_TOOLS"

echo "--> RUN . . .             . . . app yarn install"
cd ${CI_ROOT}/app
yarn 1> /dev/null

#DEPENDENCIES

yum install wget -y 1> /dev/null
echo "--> RUN . . .             . . . installing wget"
yum install unzip -y 1> /dev/null
echo "--> RUN . . .             . . . installing unzip"
yum install nano -y 1> /dev/null
echo "--> RUN . . .             . . . installing nano"


# OPENJDK 8 installation

yum install java-1.8.0-openjdk-devel -y 1> /dev/null
echo "--> RUN . . .             . . . install java 8"
java -version
echo "--> RUN . . .             . . . printing java version"

# ANDROIDSDK installation

mkdir -p /opt/androidsdk
echo "--> RUN . . .             . . . creating file androidsdk"
cd /opt/androidsdk
echo "--> RUN . . .             . . . cd into it"
wget --quiet https://dl.google.com/android/repository/commandlinetools-linux-6200805_latest.zip
echo "--> RUN . . .             . . . downloading android zip file"
unzip commandlinetools-linux-6200805_latest.zip
echo "--> RUN . . .             . . . unzip file"
cd /opt
echo "--> RUN . . .             . . . sets permission to androidsdk folder"
chown -R root:root androidsdk

cp -rf /opt/androidsdk/tools/bin/* /usr/bin/
echo "--> RUN . . .             . . . sets commands"
cp -rf /opt/androidsdk/tools/bin/* /usr/lib/
echo "--> RUN . . .             . . . sets commands"

JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.242.b08-0.el7_7.x86_64/bin
echo "--> RUN . . .             . . . setting java_home variable"
# Gradle installation

wget https://services.gradle.org/distributions/gradle-6.2.2-bin.zip -P /tmp
sudo unzip -d /opt/gradle /tmp/gradle-6.2.2-bin.zip 
sudo nano /etc/profile.d/gradle.sh
echo 'export GRADLE_HOME=/opt/gradle/gradle-6.2.2' >> /etc/profile.d/gradle.sh
echo 'export PATH=${GRADLE_HOME}/bin:${PATH}' >> /etc/profile.d/gradle.sh
sudo chmod +x /etc/profile.d/gradle.sh
source /etc/profile.d/gradle.sh
gradle -v

echo "--> RUN . . .             . . . app yarn global add @ionic/cli"
yarn global add @ionic/cli@^6.2.0
echo "--> RUN . . .             . . . app yarn global add cordova"
yarn global add cordova
echo "--> RUN . . .             . . . app yarn global add typescript"
yarn global add typescript@3.8.3
echo "--> RUN . . .             . . . app ionic cordova prepare android"
ionic cordova prepare android --no-interactive --confirm
echo "--> RUN . . .             . . . app ionic cordova build android"
ionic cordova build android --no-interactive --confirm


mkdir ${CI_ROOT}/APK
cp -r ${CI_ROOT}/app/build/* ${CI_ROOT}/APK