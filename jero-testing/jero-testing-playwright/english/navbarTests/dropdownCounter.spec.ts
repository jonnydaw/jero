import { test, expect } from '@playwright/test';
import { DropdownCounterModel } from './DropdownCounterModel';
import { Verify } from 'crypto';

test('Verify one guest by default', async ({ page }) => {
    const drodownCounterModel = new DropdownCounterModel(page);
    await drodownCounterModel.goto(`en`);
    await drodownCounterModel.verifyOneGuest();

})

test('Increment child button by random amount', async ({ page }) => {
    const drodownCounterModel = new DropdownCounterModel(page);
    await drodownCounterModel.goto(`en`);
    await drodownCounterModel.incrementChildTest();
})
