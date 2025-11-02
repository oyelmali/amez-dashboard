import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Her testten önce ana sayfaya git
  await page.goto('http://localhost:5173/');
});

test('should display the main dashboard elements', async ({ page }) => {
  // Başlığın göründüğünü kontrol et
  await expect(page.getByRole('heading', { name: 'AMEZAY DASHBOARD' })).toBeVisible();
  // Token bilgi kartının göründüğünü kontrol et
  await expect(page.getByText('Token Bilgileri')).toBeVisible();
});

test('should allow generating a proposal JSON', async ({ page }) => {
  const lpTokenInput = page.getByPlaceholder('0x...');
  const generateButton = page.getByRole('button', { name: "Teklif JSON'u Oluştur" });

  const testAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

  // Input'a adresi gir
  await lpTokenInput.fill(testAddress);

  // Butona tıkla
  await generateButton.click();

  // JSON çıktısının göründüğünü doğrula
  await expect(page.locator('pre')).toContainText(testAddress);

  // İndirme butonunun göründüğünü doğrula
  await expect(page.getByRole('button', { name: 'JSON Dosyasını İndir' })).toBeVisible();
});