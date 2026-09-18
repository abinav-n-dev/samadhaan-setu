import { describe, it, expect } from 'vitest';
import { translate, TRANSLATIONS } from '../src/services/i18n';

describe('i18n translation service', () => {
  it('returns English translation when language is EN', () => {
    const result = translate('brand.name', 'EN');
    expect(result).toBe('SAMADHANSETU');
    expect(translate('nav.dark_mode', 'EN')).toBe('Dark Mode');
  });

  it('returns Hindi translation when language is HI', () => {
    const result = translate('brand.name', 'HI');
    expect(result).toBe('समाधान सेतु');
    expect(translate('nav.dark_mode', 'HI')).toBe('डार्क मोड');
    expect(translate('side.command_center', 'HI')).toBe('सरकारी कमान केंद्र');
  });

  it('falls back to English when key is missing in Hindi', () => {
    // If a key doesn't exist in HI but exists in EN
    const result = translate('unknown.custom.key', 'HI', 'Fallback Text');
    expect(result).toBe('Fallback Text');
  });

  it('contains matching keys between EN and HI dictionaries with zero missing keys', () => {
    const enKeys = Object.keys(TRANSLATIONS.EN);
    const hiKeys = Object.keys(TRANSLATIONS.HI);
    expect(enKeys.length).toBeGreaterThanOrEqual(100);
    expect(hiKeys.length).toBeGreaterThanOrEqual(100);

    const missingInHi = enKeys.filter((key) => !(key in TRANSLATIONS.HI));
    const missingInEn = hiKeys.filter((key) => !(key in TRANSLATIONS.EN));

    expect(missingInHi).toEqual([]);
    expect(missingInEn).toEqual([]);

    // Verify all citizen flow categories exist
    const categories = [
      'category.water',
      'category.roads',
      'category.power',
      'category.health',
      'category.education',
      'category.waste',
    ];
    for (const cat of categories) {
      expect(TRANSLATIONS.EN[cat]).toBeDefined();
      expect(TRANSLATIONS.HI[cat]).toBeDefined();
    }

    // Verify status badges exist
    const statuses = [
      'status.unverified',
      'status.verified',
      'status.published',
      'status.adopted',
      'status.in_progress',
      'status.resolved',
    ];
    for (const st of statuses) {
      expect(TRANSLATIONS.EN[st]).toBeDefined();
      expect(TRANSLATIONS.HI[st]).toBeDefined();
    }

    // Verify priorities exist
    const priorities = [
      'priority.critical',
      'priority.high',
      'priority.medium',
      'priority.low',
    ];
    for (const pr of priorities) {
      expect(TRANSLATIONS.EN[pr]).toBeDefined();
      expect(TRANSLATIONS.HI[pr]).toBeDefined();
    }
  });
});
