#!/bin/bash

APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="Shelfie" # FIXME
PLIST="$APP_PATH/ios/$APP_NAME/Info.plist"
VERSION_NUMBER="$(defaults read $PLIST CFBundleShortVersionString)"
ENTRY_FILE="index.ios.js"
BUNDLE_FILE="main.jsbundle"
BUILD_PATH="$APP_PATH/build"
DEST="$BUILD_PATH/bundle"

mkdir -p "$BUILD_PATH"
rm -rf "$BUILD_PATH"/*
mkdir -p "$DEST"

cd $APP_PATH

react-native bundle \
  --entry-file "$ENTRY_FILE" \
  --platform ios \
  --dev false \
  --reset-cache \
  --bundle-output "$BUILD_PATH/$BUNDLE_FILE" \
  --assets-dest "$DEST" \
  --sourcemap-output "$BUILD_PATH/$BUNDLE_FILE.map"

if [[ ! -f "$BUILD_PATH/$BUNDLE_FILE" ]]; then
  echo "error: File $BUILD_PATH/$BUNDLE_FILE does not exist. This must be a bug with" >&2
  echo "React Native, please report it here: https://github.com/facebook/react-native/issues"
  exit 2
fi

CURRENT_DIR=$(pwd)
sed -i.bak "s#$CURRENT_DIR##g" $BUILD_PATH/main.jsbundle.map

cp "$BUILD_PATH/$BUNDLE_FILE" "$DEST/$BUNDLE_FILE"
mv "$BUILD_PATH/$BUNDLE_FILE.meta" "$DEST/$BUNDLE_FILE.meta"

# Stop the script if code-push fails
set -e
code-push release $APP_NAME $BUILD_PATH/bundle $VERSION_NUMBER

# FIXME: This should go into some central place, it's scattered over 3 places now
export SENTRY_URL="https://sentry.io/api/0/projects/shelfie/shelfieapp"
export SENTRY_TOKEN="312ee38f31254c9dbb3be6929fa00c569eb16ac6e8dc454eaf3468917c36c60a"
$APP_PATH/scripts/create-sentry-release.sh

function post_to_slack () {
  # format message as a code block ```${msg}```
  SLACK_MESSAGE="$1"
  SLACK_URL=https://hooks.slack.com/services/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

  case "$2" in
    INFO)
      SLACK_ICON=':shipit:'
      ;;
    WARNING)
      SLACK_ICON=':warning:'
      ;;
    ERROR)
      SLACK_ICON=':bangbang:'
      ;;
    *)
      SLACK_ICON=':slack:'
      ;;
  esac

  curl -X POST --data "payload={\"text\": \"${SLACK_MESSAGE}\"} ${SLACK_ICON}" ${SLACK_URL}
}

post_to_slack "*ShelfieApp* pushed live update to *staging* by $(git config user.name)" "INFO"
