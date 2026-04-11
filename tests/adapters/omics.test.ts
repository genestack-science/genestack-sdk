import { MultiOmicsParser } from '../../src/adapters/omicsParser';

describe('MultiOmicsParser', () => {
  test('should extract alleles for whitelisted variants', async () => {
    const parser = new MultiOmicsParser();
    const mockContent = `
rs4680 22 17300000 AA
rs1800497 11 11300000 GG
`;
    const variants = await parser.parseVariantFileContent(mockContent);
    expect(variants.length).toBe(2);
    expect(variants[0]!.rsId).toBe('rs4680');
    expect(parser.extractAllelesForSnp(variants, 'rs4680')).toBe('AA');
  });
});
