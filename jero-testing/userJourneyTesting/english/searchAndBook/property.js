// testcafe chrome userJourneyTesting/english/searchAndBook/property.js


import {Selector, ClientFunction} from 'testcafe'

const whereInput = Selector('#where');
const startDate = Selector('#start');
const endDate = Selector("#end");
const searchButton = Selector('.SearchPC_button__HLDYv');

const firstPropertyCard = Selector('.searchresults_propertyArea___jEsj > div').nth(0);
const propertyCardPrice = Selector('.searchresults_propertyArea___jEsj > div > strong');
const propertyCardImg = Selector('.searchresults_propertyArea___jEsj > div > img');

const propertyFirstImage = Selector('#propertyGeneral_imageArea__21uRG > figure > img')


const bookingFormPrice = Selector('#generalBooking_book__j8azb > form > div > strong').nth(0)

const startDateForm = Selector('#generalBooking_dates__l0qd5 .generalBooking_customCalendar__iAqN0').nth(0);
const endDateForm = Selector('#generalBooking_dates__l0qd5 .generalBooking_customCalendar__iAqN0').nth(1);

const guestLimits = Selector('#generalBooking_book__j8azb p').nth(2);

const increaseAdults = Selector('#generalBooking_book__j8azb button').withText('+').nth(0);
const increaseChild = Selector('#generalBooking_book__j8azb button').withText('+').nth(1);
const increasePets = Selector('#generalBooking_book__j8azb button').withText('+').nth(2);

const childFriendly = Selector('#propertyGeneral_overview__5s4if strong').withText('Child Friendly');
const petFriendly = Selector('#propertyGeneral_overview__5s4if strong').withText('Pet Friendly');

const decreaseAdults = Selector('#generalBooking_book__j8azb button').withText('−').nth(0);
const decreaseChild = Selector('#generalBooking_book__j8azb button').withText('−').nth(1);
const decreasePets = Selector('#generalBooking_book__j8azb button').withText('−').nth(2);

const bookButton = Selector('#generalBooking_book__j8azb button').nth(-1);



fixture('Property')
    .page('http://localhost:3000/en');

function getPrice(textContent){
    const val = textContent.split("•").at(1).split(" ").at(1);
    console.log(val);
    return (val.trim());
}

test('Verify Property Contains Same Price as Property Card', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton);

        const text = await propertyCardPrice.textContent;
        const price = getPrice(text); 


        

        await t
        .click(firstPropertyCard);
        const formPriceFull = await bookingFormPrice.textContent;

        const formPrice = formPriceFull.split("•").at(-1).trim();
        await t
        .expect(formPrice).eql(price);
});

test('Verify Property Contains Same Dates as search', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton)
        .click(firstPropertyCard)   
        .expect(startDateForm.value).eql("12/23/2025")
        .expect(endDateForm.value).eql("12/25/2025")
});

test('Verify Property Contains Same Image as search', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton);
        //.debug()
        const fullImageSource = await propertyCardImg.getAttribute("src");
        const imageSource = fullImageSource.split("/").at(-1).split(".").at(0);
        // console.log(fullImageSource)
        // console.log(imageSource)
        await t 
        .click(firstPropertyCard)  ;
        const propertyPageMainImageSrc = await propertyFirstImage.getAttribute("srcset");
        await t 
            .expect(propertyPageMainImageSrc).contains(imageSource);
});

test('Guest Limits', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton)
       
        .click(firstPropertyCard)
        .expect(guestLimits.textContent).contains("Minimum Guest Count: 1")
        .expect((decreaseAdults).hasAttribute("disabled")).ok();

        const maxValFull = await guestLimits.textContent;
        const maxVal = maxValFull.split(" ").at(-1);
        console.log(maxVal)
        for(let i = 0; i < maxVal - 1; i++){
            await t.click(increaseAdults)
        }
        await t
            .expect((increaseAdults).hasAttribute("disabled")).ok();

});

test('Child and pet match', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton)
       
        .click(firstPropertyCard)
        .wait(1000)
        if(await childFriendly.exists){
             await t
                .expect(increaseChild.exists).ok()
                .expect(decreaseChild.exists).ok()
        }else{
            await t
            .expect(increaseChild.exists).notOk()
            .expect(decreaseChild.exists).notOk()
        }

        if(await petFriendly.exists){
            await t
               .expect(increasePets.exists).ok()
               .expect(decreasePets.exists).ok()
       }else{
           await t
           .expect(increasePets.exists).notOk()
           .expect(decreasePets.exists).notOk()
       }
});

test.only('Cant book', async t => {
    await t
        .maximizeWindow()
        .wait(1000)

        .click(startDate)
        .typeText(startDate, "2025-12-23")
        .click(endDate)
        .typeText(endDate,"2025-12-25" )
        .typeText(whereInput, "london")

        .click(searchButton)
       
        .click(firstPropertyCard)
        .expect(bookButton.textContent).eql("You must be a registered customer to book")
        .expect(bookButton.hasAttribute("disabled")).ok()
});