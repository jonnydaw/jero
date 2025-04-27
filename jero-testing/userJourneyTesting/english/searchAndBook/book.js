// testcafe chrome userJourneyTesting/english/searchAndBook/book.js


import {Selector} from 'testcafe'

const emailInput = Selector('#email');
const passwordInput = Selector('#password');

const loginButton = Selector('#Login_button__JEIFy');

const bookButton = Selector('#generalBooking_book__j8azb button').nth(-1);
const payButton = Selector('#payPC_pay__4748Q button').withText('Confirm and Book');



fixture('Booking')
    .page('http://localhost:3000/en/login');


test('Verify Cannot book in the past', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)
        .typeText(emailInput, "testcustomer@mail.com")
        .typeText(passwordInput, "testcustomer1!")
        .click(loginButton)
        .wait(1000)

        .navigateTo('http://localhost:3000/en/property/67f6ccf6d739bf28132a76d0?startdate=2024-05-02&enddate=2024-05-27&numadults=1&numchildren=0&numpets=0')

        .click(bookButton)
        .click(payButton)
        const history = await t.getNativeDialogHistory();
        const historyItem = history[0].text
        await t
            .expect(historyItem).eql("You cannot book this property START_DATE_IS_IN_PAST")
});

test('Verify start date cannot be after end date', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)
        .typeText(emailInput, "testcustomer@mail.com")
        .typeText(passwordInput, "testcustomer1!")
        .click(loginButton)
        .wait(1000)

        .navigateTo('http://localhost:3000/en/property/67f6ccf6d739bf28132a76d0?startdate=2026-05-27&enddate=2026-05-24&numadults=1&numchildren=0&numpets=0')

        .click(bookButton)
        .click(payButton)
        const history = await t.getNativeDialogHistory();
        const historyItem = history[0].text
        await t
            .expect(historyItem).eql("You cannot book this property END_DATE_IS_BEFORE_START")
});

test('Verify booking rejected when guest count is below allowed guest count', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)
        .typeText(emailInput, "testcustomer@mail.com")
        .typeText(passwordInput, "testcustomer1!")
        .click(loginButton)
        .wait(1000)

        .navigateTo('http://localhost:3000/en/property/67f6ccf6d739bf28132a76d0?startdate=2026-05-22&enddate=2026-05-24&numadults=0&numchildren=0&numpets=0')

        .click(bookButton)
        .click(payButton)
        const history = await t.getNativeDialogHistory();
        const historyItem = history[0].text
        await t
            .expect(historyItem).eql("You cannot book this property TOO_FEW")
});

test('Verify booking rejected when guest count is ABOVE allowed guest count', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)

        .typeText(emailInput, "testcustomer@mail.com")
        .typeText(passwordInput, "testcustomer1!")
        .click(loginButton)
        .wait(1000)

        .navigateTo('http://localhost:3000/en/property/67f6ccf6d739bf28132a76d0?startdate=2026-05-22&enddate=2026-05-24&numadults=110&numchildren=0&numpets=0')

        .click(bookButton)
        .click(payButton)
        const history = await t.getNativeDialogHistory();
        const historyItem = history[0].text
        await t
            .expect(historyItem).eql("You cannot book this property TOO_MANY")
});