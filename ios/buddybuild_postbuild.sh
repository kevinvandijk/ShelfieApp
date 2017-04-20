#!/usr/bin/env bash

# export SENTRY_URL="https://sentry.io/api/0/projects/shelfie/shelfieapp"
# export SENTRY_TOKEN="312ee38f31254c9dbb3be6929fa00c569eb16ac6e8dc454eaf3468917c36c60a"

APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
$APP_PATH/scripts/create-sentry-release.sh
