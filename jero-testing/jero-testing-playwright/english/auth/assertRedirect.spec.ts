import { test, expect } from '@playwright/test';

test('Redirect when accessing protected resource (profile)', async ({  page }) => {
    await page.goto("http://localhost:3000/en/profile");  
    //await page.waitForURL("http://localhost:3000/en/login");
    // expect(page.url() === "http://localhost:3000/en")
    await page.waitForURL("http://localhost:3000/en");
    expect(page.url()).toBe("http://localhost:3000/en");
})

test('Redirect when accessing protected resource (profile/bookings)', async ({  page }) => {
    await page.goto("http://localhost:3000/en/profile/bookings");  
    // //await page.waitForURL("http://localhost:3000/en/login");
    // expect(page.url() === "http://localhost:3000/en")
    await page.waitForURL("http://localhost:3000/en");
    expect(page.url()).toBe("http://localhost:3000/en");
})