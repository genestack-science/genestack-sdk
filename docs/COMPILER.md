# GENESTACK Compiler: Comprehensive Compounds Guide

## 1. Overview

The **GENESTACK Compiler Layer** takes inferred gene expression profiles and creates high-affinity intervention stacks. It evaluates individual compound mechanics, maps them to relevant biological pathways, optimizes dosages, and screens for conflicts before outputting the final protocol.

---

## 2. Compilation Rules

The Compiler operates on four core principles:

```
+─────────────────────────────────────────────────────────────────────────────+
|                         GENESTACK Compilation Pipeline                      |
+─────────────────────────────────────────────────────────────────────────────+

   [ Suboptimal Gene Expressions ]     [ Inferred Expression Levels ]
                      │                               │
                      └────────────────┬──────────────┘
                                       │
                                       ▼
                     +─────────────────────────────────+
                     |    Targeted Selection Engine     |
                     |  - Maps molecules to pathways   |
                     |  - Eliminates redundant options |
                     +────────────────┬────────────────+
                                      │
                                      ▼
                     +─────────────────────────────────+
                     |     Dynamic Dosage Scaling      |
                     |  - Caps maximum safe dose       |
                     |  - Calculates synergy bonus     |
                     +────────────────┬────────────────+
                                      │
                                      ▼
                     +─────────────────────────────────+
                     |    Cross-Module Risk Check      |
                     |  - Prevents contraindications   |
                     |  - Flags safety overrides       |
                     +────────────────┬────────────────+
                                      │
                                      ▼
                         [ Compiled Stack Protocol ]
```

### Core Pipeline Constraints

1. **Targeted Formulation**: Every compound in the stack maps directly to a suboptimal gene expression state or biomarker reading.
2. **Redundancy Elimination**: If a single compound can address multiple pathways at once, it is consolidated to optimize stack simplicity.
3. **Synergy Maximization**: Focuses on complementary mechanisms—such as combining a GH-releasing hormone analogue with a healing peptide—to maximize performance.
4. **Constraint Filtering**: Validates the stack against dynamic dosage boundaries and safety thresholds to prevent receptor burnout or pathway suppression.

---

## 3. Intervention Compounds Database

Below is the definitive reference matrix for the primary compound interventions included in the GENESTACK Compiler.

### 3.1 Therapeutic Peptides

#### BPC-157 — Body Protection Compound 157
- **Classification**: Synthetic pentadecapeptide
- **Biological Pathway**: Nitric oxide modulation, VEGFR2 activation
- **Expression Mapping**: `TNF-α` upregulated, `IL6` upregulated
- **Mechanism of Action**: Accelerates tissue repair through localized soft tissue remodeling and direct regulation of pro-inflammatory cytokines. BPC-157 works by promoting dynamic growth factor production in targeted areas without systemic risks.
- **Dynamic Baseline Range**: `200 - 300 mcg`, administered BID (twice daily).

#### CJC-1295 — Growth Hormone Releasing Hormone Analogue
- **Classification**: Synthetic GHRH peptide (with DAC variant)
- **Biological Pathway**: Growth Hormone / IGF-1 Axis stimulation
- **Expression Mapping**: `IGF1` downregulated
- **Mechanism of Action**: Binds to pituitary receptors to stimulate pulsatile GH release, avoiding the insulin resistance risks associated with synthetic hGH.
- **Dynamic Baseline Range**: `2.0 - 2.5 mg` weekly.

#### AOD-9604 — Anti-Obesity Drug Fragment
- **Classification**: Modified GH Fragment (hGH 176-191)
- **Biological Pathway**: Lipolysis stimulation, adipogenesis restriction
- **Expression Mapping**: `FTO` upregulated
- **Mechanism of Action**: Targets specific $\beta_3$-adrenergic receptors to activate localized lipolysis without raising systemic IGF-1 levels.
- **Dynamic Baseline Range**: `250 - 350 mcg` daily in fasted states.

---

### 3.2 Neuromodulation Stacks

#### Semax — Synthetic ACTH Analogue
- **Classification**: Nootropic neuropeptide
- **Biological Pathway**: BDNF synthesis upregulation, prefrontal dopaminergic support
- **Expression Mapping**: `COMT` upregulated (High-turnover variant)
- **Mechanism of Action**: Upregulates Brain-Derived Neurotrophic Factor in dopaminergic pathways to support sustained executive focus.
- **Dynamic Baseline Range**: `400 - 600 mcg` daily via nasal spray.

#### Bromantane
- **Classification**: Actoprotector, atypical stimulant
- **Biological Pathway**: Dopamine synthesis enhancement
- **Expression Mapping**: `DRD2` downregulated (Low receptor density)
- **Mechanism of Action**: Upregulates tyrosine hydroxylase activity—the rate-limiting step in dopamine synthesis—to support long-term motivation without receptor downregulation.
- **Dynamic Baseline Range**: `50 - 100 mg` daily in the morning.

---

### 3.3 Intelligence Expansion Interventions

#### Ashwagandha (KSM-66) — Withania Somnifera
- **Classification**: Standardized Botanical Adaptogen
- **Biological Pathway**: HPA Axis / Cortisol Modulation
- **Expression Mapping**: `FKBP5` upregulated, `NR3C1` downregulated
- **Mechanism of Action**: Sensitizes glucocorticoid receptors and suppresses FKBP5 overdrive to restore negative feedback inhibition in the HPA axis.
- **Dynamic Baseline Range**: `600 - 1200 mg` daily.

#### Sulforaphane — Isothiocyanate
- **Classification**: Potent Nrf2 Activator
- **Biological Pathway**: Endogenous Antioxidant Response (Oxidative Stress)
- **Expression Mapping**: `SOD2` downregulated, `NFE2L2` downregulated
- **Mechanism of Action**: Activates the Nrf2 pathway, inducing the expression of Phase II detoxification enzymes and mitochondrial superoxide dismutase.
- **Dynamic Baseline Range**: `20 - 60 mg` daily.

#### L-Methylfolate — 5-MTHF
- **Classification**: Bioactive Vitamin B9 Analogue
- **Biological Pathway**: One-Carbon Methylation Cycle
- **Expression Mapping**: `MTHFR` downregulated (677C>T variant)
- **Mechanism of Action**: Bypasses the MTHFR rate-limiting enzyme to directly feed the methyl donor pool, ensuring stable DNA methylation and homocysteine clearance.
- **Dynamic Baseline Range**: `400 - 1000 mcg` daily.

---

## 4. Algorithmic Stack Coverage Formulation

The compiler scores the effectiveness of each stack using this specific formula:

$$\text{Coverage Score } (S_{\text{cov}}) = \frac{\text{Module Pathways Addressed}}{\text{Suboptimal Gene Targets}} \times \text{Synergy Coefficient } (\gamma) \times \text{Safety Factor } (\lambda)$$

Where:
- **Synergy Coefficient ($\gamma$)**: Represents the performance boost of using compounds with overlapping, complementary mechanisms (`1.15`).
- **Safety Factor ($\lambda$)**: Dynamically lowers the total score if a stack triggers constraint flags (`0.85`).

### 4.1 Implementation Strategy

Developers can add new therapeutic molecules to the compilation database by expanding the underlying schemas. Let's look at a typical structure:

```typescript
import { InterventionSchema } from '../src/types/expressions';

export const customIntervention: InterventionSchema = {
  id: 'int_custom_peptide',
  name: 'Thymosin Beta 4',
  targetGene: 'IL6',
  compoundClass: 'Peptide',
  baseDosageMcg: 250,
  dosageCappingMcg: 500,
  scientificRationale: 'Upregulates dynamic cell repair and reduces baseline inflammatory markers.'
};
```
