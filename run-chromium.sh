#!/usr/bin/env bash
# Create temporary folder for manifestv3

rm -rf chromium
mkdir chromium
cp -r `ls -A | grep -v "^chromium" | grep -v "web-ext"` chromium/
mv chromium/manifest-chromium.json chromium/manifest.json
cd chromium
web-ext run -t chromium
