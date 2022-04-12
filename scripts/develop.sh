#!/bin/bash
set -eo pipefail

yarn tsc --project tsconfig.build.json --watch &
yarn nodemon --watch build --delay 0.1 --exec yarn start &

wait
