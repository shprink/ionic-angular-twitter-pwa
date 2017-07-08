#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

BUILDFOLDER=build/

# clean up previous build
rm -fr $BUILDFOLDER

# Prod build
ionic-app-scripts build --prod \
                        --wwwDir $BUILDFOLDER

# remove unused css (~20% gain)
purifycss $BUILDFOLDER"build/main.css" \
          $BUILDFOLDER"build/*.js" \
          --info \
          --min \
          --out $BUILDFOLDER"build/main.css" \
          --whitelist ion-backdrop .bar-button-default ion-icon

# ngu-app-shell --module src/app/app.module.ts

# Generate our SW manifest
ngu-sw-manifest --out $BUILDFOLDER"ngsw-manifest.json" \
                --dist $BUILDFOLDER
                # --module src/app/app.module.ts \

# Copy basic SW file
cp node_modules/@angular/service-worker/bundles/worker-basic.min.js $BUILDFOLDER
mv $BUILDFOLDER"worker-basic.min.js" $BUILDFOLDER"worker-basic.js" 