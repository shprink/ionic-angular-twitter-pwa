#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

# clean up previous build
rm -fr www/

# Prod build
ionic-app-scripts build --prod

# ngu-app-shell --module src/app/app.module.ts

# Generate our SW manifest
ngu-sw-manifest --out www/ngsw-manifest.json \
                --dist www/
                # --module src/app/app.module.ts \

# Copy basic SW file
cp node_modules/@angular/service-worker/bundles/worker-basic.js www/