import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendChatMessage, ChatMessage } from '../src/services/geminiChatService';

describe('Gemini Chat Service (Setu AI Sahayak)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides grounded domain knowledge on Dumka water issues and Report #JH-1042', async () => {
    const messages: ChatMessage[] = [
      {
        id: '1',
        sender: 'user',
        text: 'What is the status of Dumka water report #JH-1042?',
        timestamp: '10:00 AM',
      },
    ];

    const response = await sendChatMessage(messages, { userRole: 'citizen' });
    expect(response.text).toContain('Dumka');
    expect(response.text).toContain('AquaShield');
    expect(response.text).toContain('Hansdiha');
    expect(response.modelUsed).toBeDefined();
  });

  it('explains the multi-factor AI priority formula accurately', async () => {
    const messages: ChatMessage[] = [
      {
        id: '1',
        sender: 'user',
        text: 'Explain the priority score formula',
        timestamp: '10:01 AM',
      },
    ];

    const response = await sendChatMessage(messages, { userRole: 'government' });
    expect(response.text).toContain('Severity (30%)');
    expect(response.text).toContain('Population Impact (25%)');
    expect(response.text).toContain('Geographic Spread (15%)');
    expect(response.text).toContain('Duplicate Signal (10%)');
  });

  it('answers CSR and Section 135 sponsorship inquiries', async () => {
    const messages: ChatMessage[] = [
      {
        id: '1',
        sender: 'user',
        text: 'How does CSR funding work for student projects?',
        timestamp: '10:02 AM',
      },
    ];

    const response = await sendChatMessage(messages, { userRole: 'industry' });
    expect(response.text).toContain('Section 135');
    expect(response.text).toContain('Schedule VII');
    expect(response.text).toContain('Tata Steel');
  });

  it('handles live API mock response smoothly when API returns candidates', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [{ text: 'Hello from Gemini 3.1 Flash! How may I assist your civic journey?' }],
            },
          },
        ],
      }),
    } as Response);

    const messages: ChatMessage[] = [
      {
        id: '1',
        sender: 'user',
        text: 'Hello Setu AI',
        timestamp: '10:03 AM',
      },
    ];

    const response = await sendChatMessage(messages, { userRole: 'student' });
    expect(response.text).toContain('Hello from Gemini 3.1 Flash');
  });
});
