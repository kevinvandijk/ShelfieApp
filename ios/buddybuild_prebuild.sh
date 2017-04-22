#!/usr/bin/env bash

if [[ "$BUDDYBUILD_BRANCH" = "master" ]]; then
  APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
  $APP_PATH/scripts/setup-react-native-bundler.sh
fi
