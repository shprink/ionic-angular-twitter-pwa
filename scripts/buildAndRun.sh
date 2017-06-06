#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

./scripts/build.sh

cd www/
http-server -p 3000