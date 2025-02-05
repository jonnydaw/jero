// https://testcafe.io/
//  testcafe chrome componentTesting/english/navbar/guestDropdown.js

import {Selector} from 'testcafe'
const guestHoverAreaText = Selector(".Dropdown_dropdown__Ry3RD span")
const guestHoverArea =  Selector('div.Dropdown_dropdown__Ry3RD');
const guestDropdownContent = Selector(".div.Dropdown_dropdownContent__68Zte")

fixture('Guest Dropdown')
    .page('http://localhost:3000/en');

test('Verify One Guest By Default', async t => {
    await t
    .debug()
        .expect(guestHoverAreaText.textContent).eql("Guests: 1");
})

test('Test Guest Dropdown', async t => {
    await t
        .hover(guestHoverArea);
});