#!/usr/bin/env bash

APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST_PATH = "$APP_PATH/android/app/src/main/AndroidManifest.xml"

export VERSION_NUMBER="$(grep versionName $MANIFEST_PATH | sed 's/[^0-9\.]*//g')"
export BUILD_NUMBER="$(grep versionCode $MANIFEST_PATH | sed 's/[^0-9]*//g')"
$APP_PATH/scripts/create-sentry-release.sh
