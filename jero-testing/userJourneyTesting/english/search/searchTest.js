// testcafe chrome userJourneyTesting/english/search/searchTest.js

// https://stackoverflow.com/questions/73225773/how-to-do-an-action-if-the-url-contains-testcafe
import {Selector, ClientFunction} from 'testcafe'

const guestHoverAreaText = Selector(".Dropdown_dropdown__tMINW span");
const whereInput = Selector('#where');
const startDate = Selector('#start');
const endDate = Selector("#end");
const searchButton = Selector('.SearchPC_button__HLDYv');
const invalidLocationArea = Selector('h1');


const getPageUrl = ClientFunction(() => window.location.href);


fixture('User Search')
    .page('http://localhost:3000/en');

test('Verify Successful search change page', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton)
        .expect(getPageUrl()).notEql('http://localhost:3000/en')
})

test('Verify url does not change if dates are the in past', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        .click(startDate)
        .typeText(startDate, "2024-12-23")
        .click(endDate)
        .typeText(endDate,"2024-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton)
        .expect(getPageUrl()).eql('http://localhost:3000/en')
})

test('Verify url does not change if end date before start date', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-21" )
        .typeText(whereInput, "london")

        .click(searchButton)
        .expect(getPageUrl()).eql('http://localhost:3000/en')
})

test('Verify url does not change no location is entered', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        .click(startDate)
        .typeText(startDate, "2024-12-23")
        .click(endDate)
        .typeText(endDate,"2024-12-25" )

        .click(searchButton)
        .expect(getPageUrl()).eql('http://localhost:3000/en')
})

test('Verify invalid location message', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "invalid location")

        .click(searchButton)
        .expect(getPageUrl()).notEql('http://localhost:3000/en')
        .expect(invalidLocationArea.textContent).eql("Sorry This Location Is Not supported");
})