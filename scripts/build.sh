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
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ──────────────────────────────────────────────────────────────────────────────
# UTILITY HELPER FUNCTIONS
# ──────────────────────────────────────────────────────────────────────────────
log_info() {
  echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warn() {
  echo -e "${YELLOW}[WARNING]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" >&2
}

# ──────────────────────────────────────────────────────────────────────────────
# PREREQUISITE SANITY CHECKS
# ──────────────────────────────────────────────────────────────────────────────
check_prerequisites() {
  log_info "Initializing pre-build environmental system validation checks..."

  # Validate Node runtime availability
  if ! command -v node &> /dev/null; then
    log_error "Node.js execution environment not found in PATH. Aborting build."
    exit 1
  fi

  # Validate Node major version meets the baseline standard
  CURRENT_NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
  if [ "$CURRENT_NODE_VERSION" -lt "$MIN_NODE_VERSION" ]; then
    log_error "Node version too old (v$CURRENT_NODE_VERSION). Minimum version required: v$MIN_NODE_VERSION."
    exit 1
  fi

  # Confirm installation of dependencies via Node modules
  if [ ! -d "./node_modules" ]; then
    log_warn "Node modules folder missing. Installing dependencies via 'npm ci'..."
    npm ci
  fi

  # Validate TypeScript compiler availability
  if [ ! -f "$TS_COMPILER" ]; then
    log_error "TypeScript compiler executable not found at $TS_COMPILER. Run npm install first."
    exit 1
  fi

  log_success "All build environment prerequisite checks passed successfully."
}

# ──────────────────────────────────────────────────────────────────────────────
# DIRECTORY SANITIZATION PHASE
# ──────────────────────────────────────────────────────────────────────────────
