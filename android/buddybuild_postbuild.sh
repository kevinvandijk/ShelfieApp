#!/usr/bin/env bash

APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST_PATH="$APP_PATH/android/app/src/main/AndroidManifest.xml"

export VERSION_NUMBER="$(grep versionName $MANIFEST_PATH | sed 's/[^0-9\.]*//g')"
export BUILD_NUMBER="$(grep versionCode $MANIFEST_PATH | sed 's/[^0-9]*//g')"

CURRENT_DIR=$(pwd)

cd $APP_PATH

mkdir -p build
cd build

BUNDLE_FILE="main.jsbundle"

node "node_modules/react-native/local-cli/cli.js" bundle \
  --entry-file index.android.js \
  --platform android \
  --dev false \
  --reset-cache \
  --bundle-output "$BUNDLE_FILE" \
  --assets-dest "$BUDDYBUILD_WORKSPACE/app/build" \
  --sourcemap-output "$BUNDLE_FILE.map"

  cd $CURRENT_DIR

$APP_PATH/scripts/create-sentry-release.sh
