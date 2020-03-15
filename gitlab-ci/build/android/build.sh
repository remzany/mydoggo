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
echo "--> RUN . . .             . . . installing wget"
yum install wget -y 1> /dev/null
echo "--> RUN . . .             . . . installing unzip"
yum install unzip -y 1> /dev/null
echo "--> RUN . . .             . . . install java 8 devel"
yum install java-1.8.0-openjdk-devel -y 1> /dev/null

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


echo "--> RUN . . .             . . . SHOW WHERE IS SDK INSTALLED"
rpm -ql java-1.8.0-openjdk-devel
echo "--> RUN . . .             . . . SHOW WHERE IS SDK INSTALLED"

# ANDROIDSDK installation

echo "--> RUN . . .             . . . creating folder androidsdk"
mkdir -p /opt/androidsdk

echo "--> RUN . . .             . . . cd into it"
cd /opt/androidsdk
echo "--> RUN . . .             . . . downloading android zip file"
wget --quiet https://dl.google.com/android/repository/commandlinetools-linux-6200805_latest.zip
echo "--> RUN . . .             . . . unzip file"
unzip -q commandlinetools-linux-6200805_latest.zip
echo "--> RUN . . .             . . . sets permission to androidsdk folder"
cd /opt
chown -R root:root androidsdk

#cp -rf /opt/androidsdk/tools/bin/* /usr/bin/
#echo "--> RUN . . .             . . . sets commands"



#Android SDK Build Tools
wget --quiet https://dl.google.com/android/repository/build-tools_r30-rc1-linux.zip -P /tmp
unzip -q -d /opt/androidsdk /tmp/build-tools_r30-rc1-linux.zip
echo "--> RUN . . .             . . . sets commands"


export ANDROID_HOME=/opt/androidsdk/Sdk
echo "--> RUN . . .             . . . sets android to path"
export PATH=$PATH:$ANDROID_HOME/tools/bin
echo "--> RUN . . .             . . . sets android to path"
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.242.b08-0.el7_7.x86_64/bin
echo "--> Setting env var . . . . . . JAVA_HOME . . .         . . . $JAVA_HOME"
# Gradle installation

wget --quiet https://services.gradle.org/distributions/gradle-6.2.2-bin.zip -P /tmp
unzip -q -d /opt/gradle /tmp/gradle-6.2.2-bin.zip 
export GRADLE_HOME=/opt/gradle/gradle-6.2.2
echo "--> Setting env var . . . . . . GRADLE_HOME . . .       . . . $GRADLE_HOME"
export PATH=${GRADLE_HOME}/bin:${PATH}
echo "--> Setting env var . . . . . . PATH . . .              . . . $PATH"

echo "displaying versions" 
gradle -v
echo "displaying versions"

echo "--> RUN . . .             . . . app yarn global add @ionic/cli"
yarn global add @ionic/cli@^6.2.0
echo "--> RUN . . .             . . . app yarn global add cordova"
yarn global add cordova
echo "--> RUN . . .             . . . app yarn global add typescript"
yarn global add typescript@3.8.3

cd ${CI_ROOT}/app

echo "--> RUN . . .             . . . app ionic cordova prepare android"
ionic cordova prepare android --no-interactive --confirm --quiet
echo "--> RUN . . .             . . . app ionic cordova build android"
ionic cordova build android --no-interactive --confirm --quiet

if [ ! -d "${CI_ROOT}/app/platforms/android/app/build/outputs/apk/debug/" ]; then
  echo "failed to build apk"
  exit 1
fi


mkdir ${CI_ROOT}/APK
cp -r ${CI_ROOT}/app/platforms/android/app/build/outputs/apk/debug/* ${CI_ROOT}/APK