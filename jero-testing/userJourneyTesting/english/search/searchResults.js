// testcafe chrome userJourneyTesting/english/search/searchResults.js

import {Selector, ClientFunction} from 'testcafe'

const whereInput = Selector('#where');
const startDate = Selector('#start');
const endDate = Selector("#end");
const searchButton = Selector('.SearchPC_button__HLDYv');
const backButton =Selector('#Overview_buttonArea__2IcaN button').withText('Back');
const nextButton = Selector('#Overview_buttonArea__2IcaN button').withText('Next');

const overviewContainerTitleZero = Selector('#Overview_container__KR_P_ h3').nth(0);
const overviewContainerTitleOne = Selector('#Overview_container__KR_P_ h3').nth(1);

const propertySection = Selector('.searchresults_propertyArea___jEsj');

const descendingButton = Selector('#filter_otherfilter__paPFn button').withText('Descending')
const ascendingButton = Selector('#filter_otherfilter__paPFn button').withText('Ascending');

fixture('Search Results')
    .page('http://localhost:3000/en');

test('Verify Overview forward cycles', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton)
        .expect(overviewContainerTitleZero.textContent).eql("Fun Fact")
        .expect(overviewContainerTitleOne.textContent).eql("Attractions")
        .click(nextButton)
        .expect(overviewContainerTitleZero.textContent).eql("Average Temperature (at time of travel)")
        .expect(overviewContainerTitleOne.textContent).eql("Traditional Dishes")
        .click(nextButton)
        .expect(overviewContainerTitleZero.textContent).eql("Crime Levels")
        .expect(overviewContainerTitleOne.textContent).eql("Typical Costs")
        .click(nextButton)
        .expect(overviewContainerTitleZero.textContent).eql("Fun Fact")
        .expect(overviewContainerTitleOne.textContent).eql("Attractions")

})

test('Verify Overview forward cycles', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton)
        .expect(overviewContainerTitleZero.textContent).eql("Fun Fact")
        .expect(overviewContainerTitleOne.textContent).eql("Attractions")
        .click(backButton)
        .expect(overviewContainerTitleZero.textContent).eql("Crime Levels")
        .expect(overviewContainerTitleOne.textContent).eql("Typical Costs")
        .click(backButton)
        .expect(overviewContainerTitleZero.textContent).eql("Average Temperature (at time of travel)")
        .expect(overviewContainerTitleOne.textContent).eql("Traditional Dishes")
        .click(backButton)
        .expect(overviewContainerTitleZero.textContent).eql("Fun Fact")
        .expect(overviewContainerTitleOne.textContent).eql("Attractions")

})

 function getPrice(textContent){
    const val = textContent.split(" ").at(0).substring(1);
    console.log(val);
    return Number(val);
}

test('Verify Ascending and Descending work as intended', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")
        .click(searchButton)


        const count = await propertySection.count;
        const initArr = [];
        for(let i = 0; i < count; i++){
            const text = await propertySection.nth(i).find('strong').textContent;
            const price = getPrice(text); 
            initArr.push(price);
        }

        const descSorted = [...initArr].sort(function (a, b) {return b - a;})
        const ascSorted = [...initArr].sort(function (a, b) {return a - b;})
        console.log("desc " + descSorted);
        console.log("acs " + ascSorted)

        await t
            .click(ascendingButton)
            .wait(1250);
        
       // const ascArr = []
        for(let i = 0; i < count; i++){
            const text = await propertySection.nth(i).find('strong').textContent;
            const price = getPrice(text); 
            await t 
                .expect(price).eql(ascSorted[i])
        }

        await t
            .click(descendingButton)
            .wait(1250);

        for(let i = 0; i < count; i++){
            const text = await propertySection.nth(i).find('strong').textContent;
            const price = getPrice(text); 
            await t 
                .expect(price).eql(descSorted[i])
        }
})

