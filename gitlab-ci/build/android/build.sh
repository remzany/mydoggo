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