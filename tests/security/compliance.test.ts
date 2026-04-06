/**
 * @file compliance.test.ts
 * @description Verifies data sandbox privacy.
 * 
 */

import { ComplianceManager } from '../../src/security/compliance';

describe('🛡️ Compliance Manager Unit Tests Suite', () => {
  let compliance: ComplianceManager;

  beforeEach(() => {
    compliance = new ComplianceManager();
  });

  it('Should successfully create a compliance manager instance', () => {
    expect(compliance).toBeDefined();
    expect(compliance).toBeInstanceOf(ComplianceManager);
  });

  it('Should correctly verify and sanitize sensitive fields containing personal data', async () => {
    const rawPayload: Record<string, any> = {
      userId: 'usr_compliance_target_01',
      email: 'clinical_patient_01@medical-cloud.org',
      fullname: 'Marcus Aurelius',
      testResults: {
        focusScore: 0.82,
        patient_id: '998811'
      }
    };

    const result = await compliance.verifyAndSanitize(rawPayload);

    expect(result).toBeDefined();
    expect(result.isCompliant).toBe(false); // Flagged because sensitive fields were removed
    expect(result.warningsDetected.length).toBeGreaterThan(0);
    
    // Verify that the user ID was converted into an anonymized hash
    expect(result.anonymizedUserId).toContain('usr_hash_');
    
    // Check that sensitive identifiers were cleared out
    expect(result.clearedFields).toContain('email');
    expect(result.clearedFields).toContain('fullname');
    expect(result.clearedFields).toContain('patient_id');
  });

  it('Should validate compliant anonymized payloads with no modifications', async () => {
    const cleanPayload: Record<string, any> = {
      userId: 'usr_clean_anonymized_99',
      interpretedScore: 0.75,
      timestamp: Date.now()
    };

    const result = await compliance.verifyAndSanitize(cleanPayload);
    expect(result.isCompliant).toBe(true);
    expect(result.warningsDetected.length).toBe(0);
    expect(result.clearedFields.length).toBe(0);
    expect(result.anonymizedUserId).toContain('usr_hash_');
  });
});
