// https://testcafe.io/
//  testcafe chrome userStoryTesting/english/navbar/guestDropdown.js
//  testcafe firefox:headless userStoryTesting/english/navbar/guestDropdown.js
// selectors

import {Selector} from 'testcafe'
const guestHoverAreaText = Selector(".Dropdown_dropdown__tMINW span");
const guestHoverArea =  Selector('div.Dropdown_dropdown__tMINW');
const guestDropdownContent = Selector("div.Dropdown_dropdownContent__z8_Hu");

const seach = Selector('#search')

const adultButtonSection = Selector(`div.Dropdown_buttonArea__ByglP > span`).nth(0);
const adultIncrementButton = Selector('button').withText('+');
const adultDecrementButton = Selector('button').withText('−');

const childButtonSection = Selector(`div.Dropdown_buttonArea__ByglP > span`).nth(1);
const childIncrementButton = Selector('button').withText('+').nth(1);
const childDecrementButton = Selector('button').withText('−').nth(1);

const petButtonSection = Selector(`div.Dropdown_buttonArea__ByglP > span`).nth(2);
const petIncrementButton = Selector('button').withText('+').nth(1);
const petDecrementButton = Selector('button').withText('−').nth(1);

//selectors end


// helpers start 

const generateRandomInt = (lowerLim, upperLim) => {
    return Math.floor(Math.random() * (upperLim - lowerLim + 1)) + lowerLim;
}

// helpers end

fixture('Guest Dropdown')
    .page('http://localhost:3000/en');

test('Verify One Guest By Default', async t => {
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
    const random = generateRandomInt(1,20);
    await t
        .hover(guestHoverArea)
        
    
    for(let i = 0;  i < random; i++){
        // verifying it is the same the dropdown as the form input.
        await t
            .click(adultIncrementButton)
            .wait(50)
            .expect((await adultButtonSection.textContent).trim() * 1).eql(i+2);
    }
    await t
        .expect(guestHoverAreaText.textContent).eql(`Guests: ${random + 1}`);
});

test('Verify adult count cannot go below one.', async t => {
   
    await t
        .hover(guestHoverArea)
        // verifying adult count is 1.
        .expect(guestHoverAreaText.textContent).eql(`Guests: 1`)
        .expect((await adultButtonSection.textContent).trim() * 1).eql(1)
        .click(adultDecrementButton)
        // expect count to be still be one.
        .expect(guestHoverAreaText.textContent).eql(`Guests: 1`)
        .expect((await adultButtonSection.textContent).trim() * 1).eql(1)
});

test.only('Increment child button by random amount', async t => {
    
    //const random = generateRandomInt(1,20);
   
    await t
    .maximizeWindow()
    //.debug()
    .debug()    
    .hover(guestHoverArea)
        .wait(50)
        
        //.expect(childIncrementButton.visible).ok()
        .hover(childIncrementButton)
        .click(childIncrementButton)

       // .debug()
        // .click(childIncrementButton)
        //.wait(10000)
        .expect((await childButtonSection.textContent).trim() * 1).eql(1);
        
    // for(let i = 0;  i < random; i++){
    //     // verifying it is the same the dropdown as the form input.
    //     await t
    //     //.debug()
    //         .click(childIncrementButton)
    //         //.wait(5000)
    //         .expect((await childButtonSection.textContent).trim() * 1).eql(i+1);
    // }
    // await t
    //     // plus 2 as there is always one adult.
    //     .expect(guestHoverAreaText.textContent).eql(`Guests: ${random + 2}`);
});

test('Verify child count cannot go below zero.', async t => {
    await t
        .hover(guestHoverArea)
        // verifying adult count is 1.
        .expect(guestHoverAreaText.textContent).eql(`Guests: 1`)
        .expect((await adultButtonSection.textContent).trim() * 1).eql(1)
        .click(adultDecrementButton)
        // expect count to be still be one.
        .expect(guestHoverAreaText.textContent).eql(`Guests: 1`)
        .expect((await adultButtonSection.textContent).trim() * 1).eql(1)
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