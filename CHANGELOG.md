# Release Changelog & Historical Updates

All notable changes to the GENESTACK SDK package are documented in this file.

Our versioning strategy follows Semantic Versioning (`MAJOR.MINOR.PATCH`):
- **Major Releases**: Breaking API changes, new system paradigms, or significant structural changes.
- **Minor Releases**: Backwards-compatible features, expanded pathways, and engine upgrades.
- **Patch Releases**: Backwards-compatible bug fixes, performance improvements, and documentation fixes.

---

## [2.1.0] - 2026-05-15

### Added
- **Phase 03 (Intelligence Expansion)**: Deepened biological logic with 25-gene library support and weighted probabilistic inference.
- **8-Category Signal Vector**: Added Mood, Stress, and Methylation metrics to the core ingestion schema.
- **Probabilistic Engine**: Re-implemented the inference engine with weighted scoring and Bayesian time-decay synthesis.
- **New Intervention Mappings**: Integrated Ashwagandha (HPA), Sulforaphane (Oxidative), and L-Methylfolate (Methylation) protocols.

### Changed
- Upgraded **Signal Interpreter** to utilize the new Probabilistic Engine for higher confidence mapping.
- Expanded **Pathogen Risk (Strain-Zero)** analysis to include cognitive and emotional biomarkers.

### Fixed
- Restored missing `ProtocolRun` and `ProtocolLogCheckpoint` lifecycle types.
- Resolved build-blocker implicit-any errors in the core pipeline.

---

## [2.0.0] - 2026-05-09

### Added
- **Experiment System (Phase 02)**: Launched the core protocol tracking engine for real-time outcome logging and experiment management.
- **Network Intelligence Layer**: Implemented data aggregation for network-wide signal insights, including match counts and outcome consensus.
- **Standardized Experiment Schema**: Defined `ExperimentRun` and `ExperimentCheckpoint` for consistent data across the DeSci layer.
- **Protocol Timeline API**: Added methods to visualize the chronological history of active and completed experiments.

### Changed
- Promoted SDK to stable **Phase 02 (Network Genesis)** build.

---

## [1.3.0-beta] - 2026-05-06

### Added
- New **SignalNormalizer** utility for standardized multi-omics data scaling and Z-Score calculation.
- Implemented **Source Origin Validation** in wearable adapters to ensure telemetry integrity.

### Changed
- Modularized the **Expression Mapping Logic** in the core Mapper engine for improved maintainability.

### Fixed
- Improved **Intervention Logic** test coverage for complex compensating biological states.

### Performance
- Implemented **Result Caching** in the Signal Interpreter to optimize repetitive data stream processing.

---

## [1.2.4]

### Added
- Created the **Signal Interpreter Layer** (`Interpreter`) to convert dynamic behavioral biometrics into inferred gene expression profiles.
- Added the **Stack Compilation Engine** (`Compiler`) to compile highly synergistic intervention stacks with conflict and synergy screening.
- Added the **Cross-Genomic Linkage Mapping Engine** (`Mapper`) to map interpreted metrics directly to inferred gene status classes.
- Added the **Multi-Tenant Runtime Isolate** (`MultiTenantIsolateManager`) for securely running multiple isolated parsing tasks in parallel.
- Added automated **HIPAA Compliance Verification** checks to help developers easily build secure, privacy-first applications.

---

## [1.2.0]

### Added
- Integrated continuous **Signal De-Noising** filters to remove outlier spikes from high-frequency wearable biometric streams.
- Added the **Direct Sequencer Adapter** to extract whitelisted target SNPs (e.g., COMT, DRD2, PER3) from raw sequencing outputs.
- Created the **Algorithmic Dosage Table** to compute custom compound dosages based on inferred expression weights.

### Changed
- Re-architected internal data schemas to use stricter TypeScript validation constraints.
- Updated the testing suite to include continuous integration verification steps.

---

## [1.1.2]

### Fixed
- Fixed an intermittent cache expiration bug where expired expression profiles remained in the LRU cache.
- Resolved a race condition during continuous bio-telemetry streaming where sensor anomalies could cause the parser to reject valid samples.
- Corrected Z-Score boundary check thresholds to avoid false positive exclusions of valid biometric readings.

---

## [1.0.0]

### Added
- Initial public release of the GENESTACK SDK.
- Support for the five core biological pathways: Dopaminergic Regulation, Circadian Rhythmicity, Inflammatory Balance, Anabolic Signaling, and Metabolic Efficiency.
- Ingestion adapters for common biomarker reports and third-party wearable device APIs.
- Comprehensive unit test runner suite and performance benchmarking tools.
