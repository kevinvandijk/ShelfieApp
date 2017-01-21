#!/bin/bash
APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REACT_NATIVE_PATH="${APP_PATH}/node_modules/react-native"

rm -f "${REACT_NATIVE_PATH}/packager/react-native-xcode.sh"
cp "${APP_PATH}/scripts/react-native-xcode.sh" "${REACT_NATIVE_PATH}/packager/react-native-xcode.sh"
