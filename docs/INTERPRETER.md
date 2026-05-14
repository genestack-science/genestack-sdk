# GENESTACK Interpreter: Expression Weight Computation Guide

## 1. Introduction

The **Signal Interpreter Layer** in the GENESTACK SDK translates subjective phenotypic signals and continuous biometric feeds into discrete genomic expression profiles. Because high-throughput laboratory data isn't always accessible in real-time, functional genomics demands a high-fidelity proxy. The GENESTACK interpreter uses behavioral patterns as dynamic markers for genotypic expression.

This manual explains the mathematics, parameters, and algorithms used to map raw biometric data to discrete expression states.

---

## 2. Theoretical Background

Genes operate in continuous, dynamic states of activity. Instead of binary switches, they are evaluated as functioning along a continuous spectrum.

```
+─────────────────────────────────────────────────────────────────────────────+
|                     Signal Extraction & Normalization Flow (v2.1)           |
+─────────────────────────────────────────────────────────────────────────────+

  [ 8-Channel Ingestion ] ----> (Mood, Stress, Methylation + 5 Core Channels)
               │
               ▼
  [ De-Noising Engine ] ---------> (Excludes out-of-bounds readings)
               │
               ▼
  [ Probabilistic Engine ] ------> (Weighted Inference for 25 Target Genes)
               │
               ▼
  [ Bayesian Synthesis ] --------> (Time-decayed state consolidation)
               │
               ▼
  [ Threshold Classifier ] ------> (Determines Expression Status)
```

### 2.1 The Phenotype-to-Genotype Correlation
Phenotypic behavior—such as sleep latency, sustained focus capacity, or localized recovery times—serves as a proxy for the current operational capacity of underlying genomic systems.

For instance, the `COMT` gene codes for the Catechol-O-Methyltransferase enzyme, which breaks down neurotransmitters like dopamine in the prefrontal cortex. A person with high-turnover `COMT` clears dopamine quickly, often leading to focus drops under low stimulation. By monitoring these specific focus patterns, the GENESTACK SDK can infer high `COMT` activity and recommend targeted adjustments.

---

## 3. Detailed Mathematical Models

The interpreter processes incoming data using a weighted probabilistic inference engine (Phase 3 upgrade).

### 3.1 Normalization of Input Variables

Continuous inputs must be normalized to a standard `[0, 1]` range before analysis:

$$\text{Normalized Value } (N) = \frac{\text{Observed Reading } (R) - \text{Minimum Baseline Value } (B_{\text{min}})}{\text{Maximum Baseline Value } (B_{\text{max}}) - \text{Minimum Baseline Value } (B_{\text{min}})}$$

### 3.2 Probabilistic Weighted Scoring

In Phase 3, the engine has transitioned from deterministic rules to multi-variate weighted sums:

$$\text{Raw Expression Value } (V_g) = \sum_{i=1}^{n} (N_i \cdot w_{i,g}) \cdot \gamma_{decay}$$

Where:
- $V_g$ is the calculated expression score for gene $g$.
- $N_i$ is the normalized value of input signal $i$.
- $w_{i,g}$ is the specific weight coefficient for that signal-gene pair.
- $\gamma_{decay}$ is the Bayesian time-decay factor.

The calculated score is classified into discrete gene status tiers:

| Calculated Score ($V$) | Target Gene Status Classification |
| :--- | :--- |
| **0.00 - 0.20** | **Downregulated** |
| **0.21 - 0.40** | **Compensating** |
| **0.41 - 0.75** | **Normal Baseline** |
| **0.76 - 1.00** | **Upregulated** |

---

## 4. Complete Weight Matrix (Expanded Phase 3)

The table below details how individual phenotypic markers map to specific inferred gene expression states across the 25-gene library.

### 4.1 Phase 3 Core Pathways

| Pathway | Metric Key | Mapped Gene Target | Status Inference | Typical Weight |
| :--- | :--- | :--- | :--- | :--- |
| **HPA Axis** | `perceivedControl` | NR3C1 | Receptor Density | 0.65 |
| **HPA Axis** | `hyperarousal` | FKBP5 | Feedback Inhib. | 0.90 |
| **Oxidative** | `localizedStiff` | SOD1 | Cytoplasmic SOD | 0.70 |
| **Oxidative** | `jointSoreness` | SOD2 | Mitochondrial SOD| 0.85 |
| **Methylation**| `samSahRatio` | MTHFR | Cycle Efficiency | 0.95 |
| **Methylation**| `homocysteine` | DNMT1 | Methyl-transferase| 0.80 |

### 4.2 Legacy Foundation Pathways

| Pathway | Focus/Sleep Metric | Mapped Gene Target | Status Inference | Weight Modifier |
| :--- | :--- | :--- | :--- | :--- |
| **Dopamine** | `stable` | COMT / DRD2 | Healthy Activity | 0.00 |
| **Dopamine** | `burst_crash` | COMT | High Turnover | 0.45 |
| **Circadian** | `deep_refreshed`| PER3 / CLOCK | Aligned Phase | 0.00 |
| **Circadian** | `wired_tired` | CLOCK | Phase Delayed | 0.42 |
| **Inflammation**| `persistent` | TNF | High Activity | 0.55 |

---

## 5. Implementation Guide: Building Custom Modulators

To extend the interpreter for custom tracking metrics, implement the `CustomInterpreter` interface:

```typescript
import { SignalInput, InterpreterResult } from '../src/types/signals';

export class CustomInterpreter extends Interpreter {
  public async computeCustomInference(input: SignalInput): Promise<InterpreterResult> {
    const defaultOutput = await this.interpret(input);
    
    // Add custom processing logic
    if (input.metadata.samplingFrequencyHz > 10) {
      defaultOutput.metrics['enhanced_resolution'] = 1;
    }
    
    return defaultOutput;
  }
}
```

This extensible architecture ensures that the GENESTACK SDK can adapt to new biological models and emerging diagnostic technologies.
