// https://testcafe.io/
//  testcafe chrome userStoryTesting/english/navbar/guestDropdown.js
// selectors

import {Selector} from 'testcafe'
const guestHoverAreaText = Selector(".Dropdown_dropdown__Ry3RD span");
const guestHoverArea =  Selector('div.Dropdown_dropdown__Ry3RD');
const guestDropdownContent = Selector("div.Dropdown_dropdownContent__68Zte");
const adultButtonSection = Selector(`div.Dropdown_buttonArea__z7Wyx > span`).nth(0)
const adultIncrementButton = Selector('button').withText('+');
const childIncrementButton = Selector('button').withText('+').nth(1);
const petIncrementButton = Selector('button').withText('+').nth(2);

//selectors end


// helpers start 

const generateRandomInt = (lowerLim, upperLim) => {
    return Math.floor(Math.random() * (upperLim - lowerLim + 1)) + lowerLim;
}

// helpers end

fixture('Guest Dropdown')
    .page('http://localhost:3000/en');

test.only('Verify One Guest By Default', async t => {
    await t
        .expect(guestHoverAreaText.textContent).eql("Guests: 1");
})

test('Test Guest Dropdown', async t => {
    await t
        .expect(guestDropdownContent.visible).notOk()
        .hover(guestHoverArea)
        .expect(guestDropdownContent.visible).ok();
});

test('Increment Adult Button by random amount', async t => {
    const random = generateRandomInt(1,255);
    await t
        .hover(guestHoverArea)
        
    
    for(let i = 0;  i < random; i++){
        // verifying it is the same the dropdown as the form input.
        await t
            .click(adultIncrementButton)
            .expect((await adultButtonSection.textContent).trim() * 1).eql(i+1);
    }
    await t
        .expect(guestHoverAreaText.textContent).eql(`Guests: ${random + 1}`);
});

// test('Increment Child Button by random amount', async t => {
//     await t
//         .hover(guestHoverArea)
//         .click(adultIncrementButton)
//         .expect(childIncrementButton.textContent).eql(`Guests: ${}`);
// });

// test('Increment Pet Button by random amount', async t => {
//     await t
//         .hover(guestHoverArea)
//         .click(adultIncrementButton)
//         .expect(petIncrementButton.textContent).eql(`Guests: ${}`);
// });