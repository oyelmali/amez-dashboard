import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProposalGenerator } from './ProposalGenerator';

// date-fns'in çıktısını sabit hale getirmek için mock'luyoruz
// Bu sayede test her çalıştığında aynı timestamp'i alırız
vi.mock('date-fns', async (importOriginal) => {
  const actual = await importOriginal<typeof import('date-fns')>();
  return {
    ...actual,
    addDays: () => new Date('2024-01-01T00:00:00.000Z'),
    getUnixTime: () => 1704067200,
  };
});

describe('ProposalGenerator', () => {
  it('should generate a valid Gnosis Safe proposal JSON when a valid address is entered', () => {
    render(<ProposalGenerator />);

    const input = screen.getByPlaceholderText(/0x.../i);
    const generateButton = screen.getByRole('button', { name: /Teklif JSON'u Oluştur/i });
    
    // Input'a geçerli bir adres yaz
    const testAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
    fireEvent.change(input, { target: { value: testAddress } });

    // Butona tıkla
    fireEvent.click(generateButton);

    // JSON çıktısını gösteren <pre> elementini bul
    const jsonOutput = screen.getByText(/"version": "1.0"/);
    
    // Çıktının ekranda göründüğünü doğrula
    expect(jsonOutput).toBeInTheDocument();
    
    // Çıktının beklenen adresi içerdiğini doğrula
    expect(jsonOutput.textContent).toContain(testAddress);
    
    // Çıktının mock'ladığımız timestamp'i içerdiğini doğrula
    expect(jsonOutput.textContent).toContain('"to": "0x1234567890123456789012345678901234567890"');
  });
});