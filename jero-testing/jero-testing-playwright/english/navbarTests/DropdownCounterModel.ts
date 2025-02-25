// https://playwright.dev/docs/pom

import { expect, type Locator, type Page } from '@playwright/test';

export class DropdownCounterModel {
    readonly page: Page;
    readonly guestHoverAreaText: Locator;
    readonly guestHoverArea: Locator;
    readonly guestDropdownContent: Locator;
    readonly adultButtonSection: Locator;
    readonly adultIncrementButton: Locator;
    readonly adultDecrementButton: Locator;
    readonly childButtonSection: Locator;
    readonly childIncrementButton: Locator;
    readonly childDecrementButton: Locator;
  
    constructor(page: Page) {
        this.page = page;
        this.guestHoverAreaText = page.locator('.Dropdown_dropdown__QZdz9 > span');
        this.guestHoverArea = page.locator('div.Dropdown_dropdown__QZdz9');
        this.guestDropdownContent = page.locator('div.Dropdown_dropdownContent__h6PpO');
        this.adultButtonSection = page.locator('div.Dropdown_buttonArea__ZDksg > span').nth(0);
        this.adultIncrementButton = page.locator('button:text("+")').nth(0);
        this.adultDecrementButton = page.locator('button:text("−")').nth(0);
        this.childButtonSection = page.locator('div.Dropdown_buttonArea__ZDksg > span').nth(1);
        this.childIncrementButton = page.locator('button:text("+")').nth(1);
        this.childDecrementButton = page.locator('button:text("−")').nth(1);
    }

    _generateRandomInt_(lowerLim : number, upperLim : number){
        return Math.floor(Math.random() * (upperLim - lowerLim + 1)) + lowerLim;
    }

    /**
     * Returns the number in the area that triggers a dropdown.
     * @returns {number} The number in the area that triggers a dropdown".
     */
    async _getFinalDigitFromMain_(){
        const guestInfo = await this.guestHoverAreaText.textContent();
        const guestCount = Number(guestInfo?.split(" ")[1]);
        return guestCount;
    }

    /**
     * Returns the number in a button area.
     * @param {number} guestType - 0 for adult, 1 for child, 2 for pet.
     * @returns {number} The number in the respective "button area".
     */
    async _getFinalDigitFromButtonSection_(guestType : number) : Promise<number>{
        const text = await this.page.locator('div.Dropdown_buttonArea__ZDksg > span').nth(guestType).textContent();
        const num = (Number(text?.trim()))
        return num;
    }
  
    async goto(locale: string) {
      await this.page.goto(`http://localhost:3000/${locale}`);
    }

    async verifyOneGuest(){
        //const guestInfo = await this.guestHoverAreaText.textContent();
        const guestCount = await this._getFinalDigitFromMain_();
        expect(guestCount).toBe(1);
    }

    async incrementAdultTest(){
        const random = this._generateRandomInt_(1,20);
        await this.guestHoverArea.hover();
        for (let i = 0; i < random; i++) {
            await this.adultIncrementButton.click();
            const buttonNum = await this._getFinalDigitFromButtonSection_(0);
            expect(buttonNum).toBe(i+2);
        }

        const guestCount = await this._getFinalDigitFromMain_();
        expect(guestCount).toBe(random + 1);
    }

    async verifyAdultLowerLimit(){
        await this.guestHoverArea.hover();
        const mainCountBeforeClick = await this._getFinalDigitFromMain_();
        const buttonSectionCountBeforeClick = await this._getFinalDigitFromButtonSection_(0);
        await this.adultDecrementButton.click();
        const mainCountAfterClick = await this._getFinalDigitFromMain_();
        const buttonSectionCountAfterClick = await this._getFinalDigitFromButtonSection_(0);
        expect(mainCountBeforeClick).toBe(mainCountAfterClick);
        expect(buttonSectionCountBeforeClick).toBe(buttonSectionCountAfterClick);
    }

    async incrementChildTest(){
        const random = this._generateRandomInt_(1,20);
        await this.guestHoverArea.hover();
        for (let i = 0; i < random; i++) {
            await this.childIncrementButton.click();
            const buttonNum = await this._getFinalDigitFromButtonSection_(1);
            expect(buttonNum).toBe(i + 1);
        }
        
        const guestCount = await this._getFinalDigitFromMain_();
        expect(guestCount).toBe(random + 1);
    }

}