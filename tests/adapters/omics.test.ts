import { MultiOmicsParser } from '../../src/adapters/omicsParser';

describe('MultiOmicsParser', () => {
  test('should extract alleles for whitelisted variants', async () => {
    const parser = new MultiOmicsParser();
