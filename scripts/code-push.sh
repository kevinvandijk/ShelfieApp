#!/bin/bash

APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="Shelfie" # FIXME
PLIST="$APP_PATH/ios/$APP_NAME/Info.plist"
VERSION_NUMBER="$(defaults read $PLIST CFBundleShortVersionString)"
ENTRY_FILE="index.ios.js"
BUNDLE_FILE="main.jsbundle"
BUILD_PATH="$APP_PATH/build"
DEST="$BUILD_PATH/bundle"
GIT_REV="$(git rev-parse --short HEAD)"
REVISION_FILE="$APP_PATH/config/revision.json"

cd $APP_PATH

# Stop the script if something fails
set -e

require_clean_work_tree () {
    # Update the index
    git update-index -q --ignore-submodules --refresh
    err=0

    # Disallow unstaged changes in the working tree
    if ! git diff-files --quiet --ignore-submodules --
    then
        echo >&2 "cannot $1: you have unstaged changes."
        git diff-files --name-status -r --ignore-submodules -- >&2
        err=1
    fi

    # Disallow uncommitted changes in the index
    if ! git diff-index --cached --quiet HEAD --ignore-submodules --
    then
        echo >&2 "cannot $1: your index contains uncommitted changes."
        git diff-index --cached --name-status -r --ignore-submodules HEAD -- >&2
        err=1
    fi

    if [ $err = 1 ]
    then
        echo >&2 "Please commit or stash them."
        exit 1
    fi
}

require_clean_work_tree

mkdir -p "$BUILD_PATH"
rm -rf "$BUILD_PATH"/*
mkdir -p "$DEST"

# For sentry to know where to post errors to
echo "{\"revision\": \"${GIT_REV}\"}" > $REVISION_FILE

react-native bundle \
  --entry-file "$ENTRY_FILE" \
  --platform ios \
  --dev false \
  --reset-cache \
  --bundle-output "$BUILD_PATH/$BUNDLE_FILE" \
  --assets-dest "$DEST" \
  --sourcemap-output "$BUILD_PATH/$BUNDLE_FILE.map"

# Clean up because it shouldn't be in git
echo "{\"revision\": \"\"}" > $REVISION_FILE

if [[ ! -f "$BUILD_PATH/$BUNDLE_FILE" ]]; then
  echo "error: File $BUILD_PATH/$BUNDLE_FILE does not exist. This must be a bug with" >&2
  echo "React Native, please report it here: https://github.com/facebook/react-native/issues"
  exit 2
fi

CURRENT_DIR=$(pwd)
sed -i.bak "s#$CURRENT_DIR##g" $BUILD_PATH/main.jsbundle.map

cp "$BUILD_PATH/$BUNDLE_FILE" "$DEST/$BUNDLE_FILE"
mv "$BUILD_PATH/$BUNDLE_FILE.meta" "$DEST/$BUNDLE_FILE.meta"

# FIXME: This should go into some central place, it's scattered over 3 places now
export SENTRY_URL="https://sentry.io/api/0/projects/shelfie/shelfieapp"
export SENTRY_TOKEN="312ee38f31254c9dbb3be6929fa00c569eb16ac6e8dc454eaf3468917c36c60a"
$APP_PATH/scripts/create-sentry-release.sh

cd $BUILD_PATH/bundle
code-push release $APP_NAME . $VERSION_NUMBER

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
