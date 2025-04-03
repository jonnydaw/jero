// https://playwright.dev/docs/pom

import { expect, type Locator, type Page } from '@playwright/test';

export class DropdownNavigationModel {
    readonly page: Page;
    readonly navHoverArea: Locator;
    readonly navHoverAreaContent: Locator;
    readonly authSection : Locator;
    readonly loginLink : Locator;
    readonly signupLink : Locator;

  
    constructor(page: Page) {
        this.page = page;
        this.navHoverArea = page.locator('div.profiledropdown_dropdown__k_7Wn');
        this.navHoverAreaContent = page.locator('div.profiledropdown_dropdownContent__47ejt');
        this.authSection = page.locator('div.profiledropdown_authDropdown__v6z0Y');
        this.loginLink = page.locator('div.profiledropdown_authDropdown__v6z0Y > a').nth(0);
        this.signupLink = page.locator('div.profiledropdown_authDropdown__v6z0Y > a').nth(1);
    }


  
    async goto(locale: string) {
      await this.page.goto(`http://localhost:3000/${locale}`);
    }

    async verifyRedirectToLoginPage(){
        await this.navHoverArea.hover();
        const val = await this.loginLink.textContent();
        expect(val).toBe("Login");
        await this.loginLink.click();
        // https://stackoverflow.com/questions/68488352/using-playwright-page-url-is-getting-a-previous-url-instead-of-the-current-ur
        await this.page.waitForURL("http://localhost:3000/en/login");
        expect(this.page.url()).toBe("http://localhost:3000/en/login");
    }

    async verifyRedirectToSignUpPage(){
        await this.navHoverArea.hover();
        const val = await this.signupLink.textContent();
        expect(val).toBe("Sign up");
        await this.signupLink.click();
        // https://stackoverflow.com/questions/68488352/using-playwright-page-url-is-getting-a-previous-url-instead-of-the-current-ur
        await this.page.waitForURL("http://localhost:3000/en/signup");
        expect(this.page.url()).toBe("http://localhost:3000/en/signup");
    }


}