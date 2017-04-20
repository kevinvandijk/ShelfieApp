#!/usr/bin/env bash

export FULL_GIT_REVISION="${BUDDYBUILD_BRANCH}.${GIT_REV}"

APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
$APP_PATH/scripts/setup-react-native-bundler.sh
