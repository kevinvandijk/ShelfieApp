#!/usr/bin/env bash

if [[ "$BUDDYBUILD_BRANCH" = "master" ]]; then
  export GIT_REV="$(git rev-parse --short HEAD)"

  # For sentry to know where to post errors to
  REVISION_FILE="./config/revision.json"
  echo "{\"revision\": \"${GIT_REV}\"}" > $REVISION_FILE
fi
