import { test, expect } from '@playwright/test';

test.describe('Market Analysis E2E', () => {
    test('should open Blue Ocean Recon and load recipes', async ({ page }) => {
        // Visit the homepage
        await page.goto('http://localhost:3000');

        // Verify page title
        await expect(page.locator('h1')).toContainText('遊戲成功率分析器');

        // Find and click the Recon button
        const reconButton = page.locator('button:has-text("偵察市場藍海")');
        await expect(reconButton).toBeVisible();
        await reconButton.click();

        // Verify the Modal appears
        const modal = page.locator('h2:has-text("市場藍海偵察報告")');
        await expect(modal).toBeVisible();

        // Wait for recipes to load (loading state check)
        // We expect at least one recipe card or the "no data" message if DB is truly empty,
        // but given we just seeded data, we expect results.
        const recipeTitle = page.locator('h3').first();

        // Wait for loading to finish (the search icon animation usually disappears or h3 appears)
        // Adjust timeout for potential delay
        await expect(recipeTitle).toBeVisible({ timeout: 10000 });

        // Verify we have at least one valid recipe title
        const titleText = await recipeTitle.textContent();
        console.log('Detected Recipe:', titleText);
        expect(titleText?.length).toBeGreaterThan(0);
    });
});
