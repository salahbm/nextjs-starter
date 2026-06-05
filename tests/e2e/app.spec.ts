import { expect, test } from '@playwright/test';

test('redirects protected root to localized sign in', async ({ page }) => {
  await page.goto('/en');

  await expect(page).toHaveURL(/\/en\/sign-in$/);
  await expect(
    page.getByRole('heading', { name: 'Welcome back' }),
  ).toBeVisible();
});

test('health endpoint reports ok', async ({ request }) => {
  const response = await request.get('/api/health');
  const body = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(body).toEqual(expect.objectContaining({ status: 'ok' }));
});
