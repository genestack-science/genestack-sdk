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
clean_directories() {
  log_info "Sanitizing old compilation artifacts in $DIST_DIR..."
  if [ -d "$DIST_DIR" ]; then
    rm -rf "$DIST_DIR"
    log_success "Successfully removed legacy build files."
  fi
  mkdir -p "$DIST_DIR"
}

# ──────────────────────────────────────────────────────────────────────────────
# TESTING & VALIDATION RUNNER
# ──────────────────────────────────────────────────────────────────────────────
execute_test_suites() {
  log_info "Running system test suites prior to production compilation..."
  if npm test; then
    log_success "All unit tests passed successfully."
  else
    log_error "Unit test execution failure. Resolving issues is required to proceed."
    exit 1
  fi
}

# ──────────────────────────────────────────────────────────────────────────────
# PRODUCTION COMPILATION PHASE
# ──────────────────────────────────────────────────────────────────────────────
compile_source() {
  log_info "Compiling TypeScript files to ECMAScript module files via tsc..."
  
  START_TIME=$(date +%s)

  if ! "$TS_COMPILER" --project tsconfig.json; then
    log_error "TypeScript compilation errors detected. Please check source syntax."
    exit 1
  fi

  END_TIME=$(date +%s)
  DURATION=$((END_TIME - START_TIME))

  log_success "Compilation completed successfully in ${DURATION} seconds."
}

# ──────────────────────────────────────────────────────────────────────────────
# POST-BUILD LOGISTICS & PACKAGING
# ──────────────────────────────────────────────────────────────────────────────
post_build_processing() {
  log_info "Copying essential metadata files into target bundle..."
  
  if [ -f "package.json" ]; then
    cp package.json "$DIST_DIR/"
  fi

  if [ -f "README.md" ]; then
    cp README.md "$DIST_DIR/"
  fi

  if [ -f "LICENSE" ]; then
    cp LICENSE "$DIST_DIR/"
  fi

  log_info "Calculating overall bundle size..."
  TOTAL_SIZE=$(du -sh "$DIST_DIR" | cut -f1)
  
  log_success "Post-build processes completed. Bundle distribution size: $TOTAL_SIZE."
}

# ──────────────────────────────────────────────────────────────────────────────
# MAIN PIPELINE EXECUTION ENTRYPOINT
# ──────────────────────────────────────────────────────────────────────────────
main() {
  echo -e "${CYAN}================================================================${NC}"
  echo -e "${CYAN}🧬 GENESTACK PRODUCTION BUNDLE SYNTHESIZER${NC}"
  echo -e "${CYAN}================================================================${NC}\n"

  check_prerequisites
  clean_directories
  execute_test_suites
  compile_source
  post_build_processing

  echo -e "\n${CYAN}================================================================${NC}"
  echo -e "${GREEN}🎉 BUILD COMPLETE: $PROJECT_NAME production files generated.${NC}"
  echo -e "${CYAN}================================================================${NC}"
}

main "$@"
