import { test, expect } from '@playwright/test';
import { DropdownNavigationModel } from './DropdownNavigationModel';

test('Verify redirect to login page', async ({ page }) => {
    const drodownNavModel = new DropdownNavigationModel(page);
    await drodownNavModel.goto(`en`);
    await drodownNavModel.verifyRedirectToLoginPage();
})


test('Verify redirect to sigup page', async ({ page }) => {
    const drodownNavModel = new DropdownNavigationModel(page);
    await drodownNavModel.goto(`en`);
    await drodownNavModel.verifyRedirectToSignUpPage();
})

// test('Verify redirect to signup page', async ({ page }) => {
//     const drodownNavModel = new DropdownNavigationModel(page);
//     await drodownNavModel.goto(`en`);
//     await drodownNavModel.verifyRedirectToLoginPage();
// })

// test('Increment adult count by random amount (english)', async ({ page}) =>{
//     const drodownCounterModel = new DropdownNavigationModel(page);
//     await drodownCounterModel.goto(`en`);
//     await drodownCounterModel.incrementAdultTest();
// })

// test('Increment child count by random amount (english)', async ({ page }) => {
//     const drodownCounterModel = new DropdownNavigationModel(page);
//     await drodownCounterModel.goto(`en`);
//     await drodownCounterModel.incrementChildTest();
// })

// test('Verify adult count cannot go below zero (en)', async ({ page}) => {
//     const drodownCounterModel = new DropdownNavigationModel(page);
//     await drodownCounterModel.goto(`en`);
//     await drodownCounterModel.verifyAdultLowerLimit();
// })