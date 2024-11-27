// https://testcafe.io/
import {Selector} from 'testcafe'

const guestHoverArea =  Selector('div.Dropdown_dropdown__Ry3RD');
fixture('Pizza Palace')
    .page('http://localhost:3000/en');

test('Test Guest Dropdown', async t => {
    await t
    .debug()
        // automatically dismiss dialog boxes
        .hover(guestHoverArea);
});