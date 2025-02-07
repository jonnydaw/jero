// https://playwright.dev/docs/pom

import { expect, type Locator, type Page } from '@playwright/test';

export class DropdownCounterModel {
    readonly page: Page;
    readonly guestHoverAreaText: Locator;
    readonly guestHoverArea: Locator;
    readonly guestDropdownContent: Locator;
    readonly childButtonSection: Locator;
    readonly childIncrementButton: Locator;
    readonly childDecrementButton: Locator;
  
    constructor(page: Page) {
        this.page = page;
        this.guestHoverAreaText = page.locator('.Dropdown_dropdown__Ry3RD > span');
        this.guestHoverArea = page.locator('div.Dropdown_dropdown__Ry3RD');
        this.guestDropdownContent = page.locator('div.Dropdown_dropdownContent__68Zte');
        this.childButtonSection = page.locator('div.Dropdown_buttonArea__z7Wyx > span').nth(1);
        this.childIncrementButton = page.locator('button:text("+")').nth(1);
        this.childDecrementButton = page.locator('button:text("−")').nth(1);
        
    }

    generateRandomInt(lowerLim : number, upperLim : number){
        return Math.floor(Math.random() * (upperLim - lowerLim + 1)) + lowerLim;
    }
  
    async goto(locale: string) {
      await this.page.goto(`http://localhost:3000/${locale}`);
    }

    async verifyOneGuest(){
        const guestInfo = await this.guestHoverAreaText.textContent();
        console.log(guestInfo?.split(" "));
        const guestCount = Number(guestInfo?.split(" ")[1]);
        expect(guestCount).toBe(1);
    }
    async incrementChildTest(){
        const random = this.generateRandomInt(1,20);
        await this.guestHoverArea.hover();
        for (let i = 0; i < random; i++) {
            await this.childIncrementButton.click();
            const textContent = await this.childButtonSection.textContent();
            expect(Number(textContent?.trim())).toBe(i + 1);
        }
        
        const guestTextContent = await this.guestHoverAreaText.textContent();
        expect(guestTextContent).toBe(`Guests: ${random + 1}`);
    }

}