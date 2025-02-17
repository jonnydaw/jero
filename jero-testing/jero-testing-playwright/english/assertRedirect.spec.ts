import { test, expect } from '@playwright/test';

test('Redirect when accessing protected resource (profile)', async ({  page }) => {
    await page.goto("http://localhost:3000/en/profile");  
    //await page.waitForURL("http://localhost:3000/en/login");
    expect(page.url() === "http://localhost:3000/en")
})
