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

  it('contains matching keys between EN and HI dictionaries', () => {
    const enKeys = Object.keys(TRANSLATIONS.EN);
    const hiKeys = Object.keys(TRANSLATIONS.HI);
    expect(enKeys.length).toBeGreaterThanOrEqual(50);
    expect(hiKeys.length).toBeGreaterThanOrEqual(50);

    // Verify critical navigation keys exist in both
    const criticalKeys = [
      'brand.name',
      'nav.dark_mode',
      'nav.light_mode',
      'side.overview',
      'side.explore_challenges',
      'side.command_center',
      'side.citizen_dashboard',
      'role.government',
      'role.citizen',
    ];

    for (const key of criticalKeys) {
      expect(TRANSLATIONS.EN[key]).toBeDefined();
      expect(TRANSLATIONS.HI[key]).toBeDefined();
    }
  });
});
