#!/bin/bash

npm install
grunt
tar --xform s:'./':'./themes/critical-mass-sternfahrt-theme/': -czf v0.0.9-release.tar.gz ./layouts/ ./static/ ./theme.toml
