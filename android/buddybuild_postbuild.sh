#!/usr/bin/env bash

if [[ "$BUDDYBUILD_BRANCH" = "master" ]]; then
  APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
  MANIFEST_PATH="$APP_PATH/android/app/src/main/AndroidManifest.xml"

  export VERSION_NUMBER="$(grep versionName $MANIFEST_PATH | sed 's/[^0-9\.]*//g')"
  export BUILD_NUMBER="$BUDDYBUILD_BUILD_NUMBER"

  CURRENT_DIR=$(pwd)

  cd $APP_PATH

  mkdir -p build
  cd build

  export BUNDLE_FILE="index.android.bundle"
  export BUNDLE_PATH="$APP_PATH/build/$BUNDLE_FILE"

  node "$BUDDYBUILD_WORKSPACE/node_modules/react-native/local-cli/cli.js" bundle \
    --entry-file index.android.js \
    --platform android \
    --dev false \
    --reset-cache \
    --bundle-output "$BUNDLE_FILE" \
    --assets-dest "$BUDDYBUILD_WORKSPACE/android/app/build/intermediates/release" \
    --sourcemap-output "$BUNDLE_FILE.map"

  cd ..

  if [[ ! -f "./build/$BUNDLE_FILE" ]]; then
    echo "error: File ./build/$BUNDLE_FILE does not exist. This must be a bug with" >&2
    echo "React Native, please report it here: https://github.com/facebook/react-native/issues"
    exit 2
  fi

  sed -i.bak "s#/tmp/sandbox/workspace##g" ./build/index.android.bundle.map

  cd $CURRENT_DIR

  $APP_PATH/scripts/create-sentry-release.sh
fi
