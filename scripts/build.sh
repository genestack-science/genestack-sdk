#!/usr/bin/env bash
# ==============================================================================
# 🧬 GENESTACK SDK Production Bundle & Packaging Optimization Script
# File: build.sh
# ==============================================================================

set -eo pipefail

# ──────────────────────────────────────────────────────────────────────────────
# CORE CONFIGURATION DEFAULTS
# ──────────────────────────────────────────────────────────────────────────────
PROJECT_NAME="genestack-sdk"
DIST_DIR="./dist"
BUILD_LOG="./build.log"
MIN_NODE_VERSION=18
TS_COMPILER="./node_modules/.bin/tsc"

# ANSI Color Output Directives
RED='\033[0;31m'
