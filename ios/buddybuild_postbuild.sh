#!/usr/bin/env bash

# if [[ "$BUDDYBUILD_BRANCH" = "master" ]]; then
#   APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
#   PLIST="$APP_PATH/ios/Shelfie/Info.plist"
#
#   export VERSION_NUMBER="$(defaults read $PLIST CFBundleShortVersionString)"
#   export BUILD_NUMBER="$(defaults read $PLIST CFBundleVersion)"
#   export BUNDLE_FILE="main.jsbundle"
#   export BUNDLE_PATH="$APP_PATH/build/$BUNDLE_FILE"
#
#   $APP_PATH/scripts/create-sentry-release.sh
# fi
