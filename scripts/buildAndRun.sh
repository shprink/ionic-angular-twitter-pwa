#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

BUILDFOLDER=build/

# clean up previous build
rm -fr $BUILDFOLDER

# Prod build
ionic-app-scripts build --wwwDir $BUILDFOLDER

# ngu-app-shell --module src/app/app.module.ts

# Generate our SW manifest
ngu-sw-manifest --out $BUILDFOLDER"ngsw-manifest.json" \
                --dist $BUILDFOLDER
                # --module src/app/app.module.ts \

# Copy basic SW file
cp node_modules/@angular/service-worker/bundles/worker-basic.js $BUILDFOLDER

node server/index.js & http-server -o -p 3000 $BUILDFOLDER