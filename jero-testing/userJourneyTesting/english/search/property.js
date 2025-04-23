import {Selector, ClientFunction} from 'testcafe'

const guestHoverAreaText = Selector(".Dropdown_dropdown__tMINW span");
const whereInput = Selector('#where');
const startDate = Selector('#start');
const endDate = Selector("#end");
const searchButton = Selector('.SearchPC_button__HLDYv');
const backButton =Selector('#Overview_buttonArea__2IcaN button').withText('Back');
const nextButton = Selector('#Overview_buttonArea__2IcaN button').withText('Next');

const overviewContainer = Selector('#Overview_container__KR_P_ h3')
const overviewContainerTitleZero = Selector('#Overview_container__KR_P_ h3').nth(0);
const overviewContainerTitleOne = Selector('#Overview_container__KR_P_ h3').nth(1);

const propertySection = Selector('.searchresults_propertyArea___jEsj');
const propertyZero = Selector('#searchresults_cards__kH_5T div > strong').nth(0);

const propertyLast = Selector('#searchresults_cards__kH_5T div > strong').nth(-1);

const descendingButton = Selector('#filter_otherfilter__paPFn button').withText('Descending')
const ascendingButton = Selector('#filter_otherfilter__paPFn button').withText('Ascending');


const getPageUrl = ClientFunction(() => window.location.href);


fixture('Search Results')
    .page('http://localhost:3000/en');



test('Verify Property Open', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton)
});