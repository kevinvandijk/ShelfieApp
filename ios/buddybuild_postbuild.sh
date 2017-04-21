#!/usr/bin/env bash

APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PLIST="$APP_PATH/ios/$APP_NAME/Info.plist"

export VERSION_NUMBER="$(defaults read $PLIST CFBundleShortVersionString)"
export BUILD_NUMBER="$(defaults read $PLIST CFBundleVersion)"

$APP_PATH/scripts/create-sentry-release.sh
