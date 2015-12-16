#####################################################
# Author : Saliya Ruwan                             #
# AppXpress Build Script for ios and android build  #
#####################################################

. build.properties

SCRIPT_SOURCE_DIR=$(echo ${PWD})
cd $SOURCE_DIR
SOURCE_DIR=$(echo ${PWD})
cd $SCRIPT_SOURCE_DIR
cd $DEST_DIR
DEST_DIR=$(echo ${PWD})
BUILD_DEST_DIR=$DEST_DIR/build
BUILD_RESOURCES_DIR=$SCRIPT_SOURCE_DIR/build_resources
APP_URL='PASTE HOST URL HERE'

clean_build_dir(){
    if [ -d "$BUILD_DEST_DIR" ]; then
        rm -R $BUILD_DEST_DIR
    fi
}

if [ "$#" -eq 1 ] || [ "$#" -eq 2 ]; then
    if [ "$#" -eq 0 ]; then
        BUILD_FLAG=true
    elif [ "$#" -eq 1 ] && [ "$1" = "--clean" ]; then
        clean_build_dir
        exit 1
    elif [ "$#" -eq 2 ] && [ "$1" = "--clean" ] && [ "$2" = "--build" ]; then
        clean_build_dir
        BUILD_FLAG=true
    else
        echo "*********************** build commands *********************"
        echo "Build Application - './build.sh' "
        echo "Cleaning build directory - './build.sh --clean' "
        echo "Clean and Build application - './build.sh --clean --build'"
        echo "************************************************************"
        exit 1
    fi
fi

if [[ "$BUILD_FLAG" = "false" ]]; then
    exit 1
fi

if [ ! -d "$BUILD_DEST_DIR" ]; then
    mkdir $BUILD_DEST_DIR
fi

cd $SOURCE_DIR
if ! grep -q "build" ".gitignore"; then
    echo "build" >> .gitignore
fi

xml () {
    local IFS=\>
    read -d \< ENTITY CONTENT
    local ret=$?
    TAG_NAME=${ENTITY%% *}
    ATTRIBUTES=${ENTITY#* }
    return $ret
}

xmlParse () {
    if [[ $TAG_NAME = "widget" ]] ; then
        eval local $ATTRIBUTES
        APP_IDENTIFIER=$(echo "$id")
        APP_VERSION=$(echo "$version")
    elif [[ $TAG_NAME = "name" ]]; then
        APP_NAME=$(echo "$CONTENT")
    fi
}

while xml; do
    xmlParse
done < $SOURCE_DIR/config.xml

if [[ "$IOS_DEV" = "true" ]]; then
   echo "==== IOS DEVELOPMENT Build ===="
   IOS_DEST=$BUILD_DEST_DIR/ios/DEV
    if [ ! -d "$IOS_DEST" ]; then
      mkdir $IOS_DEST
    fi
    rm "$IOS_DEST/$APP_NAME.ipa"
    rm "$IOS_DEST/$APP_NAME.plist"
    
    cd $SOURCE_DIR
    ionic build ios
    cd $SOURCE_DIR/platforms/ios/
    
    xcodebuild -scheme "$APP_NAME" clean build archive -archivePath "$IOS_DEST/$APP_NAME"
    
    xcodebuild -exportArchive -exportFormat ipa -archivePath "$IOS_DEST/$APP_NAME.xcarchive" -exportPath "$IOS_DEST/$APP_NAME.ipa" -exportProvisioningProfile "$IOS_PROVISIONING_PROFILE_DEV"
    rm -R "$IOS_DEST/$APP_NAME.xcarchive"
fi

if [[ "$IOS_ENT" = "true" ]]; then
    echo "IOS Enterprise build"
    IOS_DEST=$BUILD_DEST_DIR/ios/ENT
    if [ ! -d "$IOS_DEST" ]; then
      mkdir $IOS_DEST
    fi
    rm "$IOS_DEST/$APP_NAME.ipa"
    rm "$IOS_DEST/$APP_NAME.plist"
    
    cd $SOURCE_DIR
    ionic build ios
    cd $SOURCE_DIR/platforms/ios/
    
    xcodebuild -scheme "$APP_NAME" clean build archive -archivePath "$IOS_DEST/$APP_NAME"
    
    xcodebuild -exportArchive -exportFormat ipa -archivePath "$IOS_DEST/$APP_NAME.xcarchive" -exportPath "$IOS_DEST/$APP_NAME.ipa" -exportProvisioningProfile "$IOS_PROVISIONING_PROFILE_ENT"
    
    cat $BUILD_RESOURCES_DIR/ios/template.plist | sed -e "s/\${APP_NAME}/$APP_NAME/" -e "s/\${APP_URL}/$APP_URL/" -e "s/\${APP_IDENTIFIER}/$APP_IDENTIFIER/" -e "s/\${APP_VERSION}/$APP_VERSION/" > $IOS_DEST/$APP_NAME.plist
    rm -R "$IOS_DEST/$APP_NAME.xcarchive"
fi

if [[ "$IOS_STORE" = "true" ]]; then
    #TODO : IOS APP STORE build
    echo "IOS APP STORE build"
fi

if [[ "$GENERATE_KEYSTORE" = "true" ]]; then
    echo "~~~ GENERATE KEYSTORE ~~~"
    keytool -genkey -v -keystore $BUILD_RESOURCES_DIR/android/$APP_NAME-release-key.keystore -alias $APP_NAME -keyalg RSA -keysize 2048 -validity 10000
fi



if [[ "$ANDROID_DEV" = "true" ]]; then
    echo "ANDROID Development build"
    ANDROID_DEST=$BUILD_DEST_DIR/android
    if [ ! -d "$ANDROID_DEST" ]; then
      mkdir $ANDROID_DEST
    fi
    cd $SOURCE_DIR
    ionic build android
    rm $ANDROID_DEST/$APP_NAME.apk
    cp $SOURCE_DIR/platforms/android/build/outputs/apk/android-debug.apk $ANDROID_DEST/$APP_NAME.apk
    exit 1
fi

if [[ "$ANDROID_STORE" = "true" ]]; then
    echo "ANDROID Development build"
    KEYSTORE=$BUILD_RESOURCES_DIR/android/$APP_NAME-release-key.keystore
    if [ ! -e "$KEYSTORE" ]; then
        echo "keystore file does not exsist"
        echo "creating new keystore"
        keytool -genkey -v -keystore $KEYSTORE -alias $APP_NAME -keyalg RSA -keysize 2048 -validity 10000
    fi
    
    ANDROID_DEST=$BUILD_DEST_DIR/android
    if [ ! -d "$ANDROID_DEST" ]; then
      mkdir $ANDROID_DEST
    fi
    cd $SOURCE_DIR
    cordova build --release android
    if [ -e "$ANDROID_DEST/$APP_NAME.apk" ]; then
        rm $ANDROID_DEST/$APP_NAME.apk
    fi
    RELEASE_APK=$SOURCE_DIR/platforms/android/build/outputs/apk/android-release-unsigned.apk
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE $RELEASE_APK $APP_NAME
    cp $SOURCE_DIR/platforms/android/build/outputs/apk/android-release-unsigned.apk $ANDROID_DEST/$APP_NAME.apk
fi



