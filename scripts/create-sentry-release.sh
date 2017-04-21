#!/bin/bash

# Enable to output commands before running for debugging:
# set -x

if [ -z ${SENTRY_URL+x} ]; then
  echo "[ERROR] SENTRY_URL needs to be set"
  exit 1
fi

if [ -z ${SENTRY_TOKEN+x} ]; then
  echo "[ERROR] SENTRY_TOKEN needs to be set"
  exit 1
fi

# Script
APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# APP_NAME="$(basename $APP_PATH)"
# APP_NAME="Shelfie" # TODO: Get this from package.json
GIT_REV="$(git rev-parse --short HEAD)"
FULL_VERSION="$VERSION_NUMBER.$BUILD_NUMBER.$GIT_REV"
# BUNDLE_PATH="$APP_PATH/build/$BUNDLE_FILE"
# SOURCEMAP_PATH="$APP_PATH/build/main.jsbundle.map"
SOURCEMAP_PATH="$BUNDLE_PATH.map"

if [ ! -f "$BUNDLE_PATH" ]; then
  echo "[ERROR] Javascript bundle not found in build directory"
  exit 1
fi

if [ ! -f "$SOURCEMAP_PATH" ]; then
  echo "[ERROR] Sourcemap not found in build directory"
  exit 1
fi

echo "[INFO] Creating release $FULL_VERSION on Sentry"
release_output="$(
  curl "$SENTRY_URL/releases/" \
    -s -o /dev/null -w "%{http_code}" \
    -X POST \
    -H "Authorization: Bearer $SENTRY_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"version\": "\"$FULL_VERSION\""}"
)"

if [[ $release_output = 208 ]] ;then
  echo "[INFO] Release $FULL_VERSION already exists on Sentry"
  exit 0
fi

if [[ $release_output > 299 ]] ;then
  echo "[ERROR] Could not create release version on Sentry"
  exit 1
fi

echo "[INFO] Uploading sourcemap to Sentry"
output="$(curl "$SENTRY_URL/releases/$FULL_VERSION/files/" \
  -s -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "Authorization: Bearer $SENTRY_TOKEN" \
  -F file="@$BUNDLE_PATH.map" \
  -F name="/$BUNDLE_FILE.map"
)"

if [[ $output > 299 ]] ;then
  echo "[ERROR] Could not upload main.jsbundle.map to Sentry"
  exit 1
fi

echo "[INFO] Uploading jsbundle to Sentry"
output="$(curl "$SENTRY_URL/releases/$FULL_VERSION/files/" \
  -s -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "Authorization: Bearer $SENTRY_TOKEN" \
  -F file="@$BUNDLE_PATH" \
  -F name="/$BUNDLE_FILE"
)"

if [[ $output > 299 ]] ;then
  echo "[ERROR] Could not upload main.jsbundle to Sentry"
  exit 1
fi

echo "[INFO] Successfully created release $FULL_VERSION on Sentry!"
