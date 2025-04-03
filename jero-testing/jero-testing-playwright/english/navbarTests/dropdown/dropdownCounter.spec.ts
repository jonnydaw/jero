import { test, expect } from '@playwright/test';
import { DropdownCounterModel } from './DropdownCounterModel';

test('Verify one guest by default', async ({ page }) => {
    const drodownCounterModel = new DropdownCounterModel(page);
    await drodownCounterModel.goto(`en`);
    await drodownCounterModel.verifyOneGuest();

})

test('Increment adult count by random amount (english)', async ({ page}) =>{
    const drodownCounterModel = new DropdownCounterModel(page);
    await drodownCounterModel.goto(`en`);
    await drodownCounterModel.incrementAdultTest();
})

test('Increment child count by random amount (english)', async ({ page }) => {
    const drodownCounterModel = new DropdownCounterModel(page);
    await drodownCounterModel.goto(`en`);
    await drodownCounterModel.incrementChildTest();
})

test('Verify adult count cannot go below zero (en)', async ({ page}) => {
    const drodownCounterModel = new DropdownCounterModel(page);
    await drodownCounterModel.goto(`en`);
    await drodownCounterModel.verifyAdultLowerLimit();
})
