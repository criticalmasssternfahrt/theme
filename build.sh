#!/bin/bash

tar --xform s:'./':'./themes/critical-mass-sternfahrt-theme/': -czf v0.0.1-release.tar.gz ./layouts/ ./static/ ./theme.toml
