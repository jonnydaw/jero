// testcafe chrome userJourneyTesting/english/addProperty/addPropertyTests.js


import {Selector, ClientFunction} from 'testcafe'

const emailInput = Selector('#email');
const passwordInput = Selector('#password');

const loginButton = Selector('#Login_button__JEIFy');

const profileButton  = Selector('.NavbarPC_links__awscO.NavbarPC_button__u68__').nth(1);
const manageProfileArea = Selector('a').withText('Manage Properties')
const addNewPropertyLink = Selector('a').withText('Add a new property');
const inputAddress = Selector('#Step1AddProperty_formSearch__6w89M input');
const searchButton = Selector('#Step1AddProperty_formSearch__6w89M button').withText('Search');
const addressFirstOption = Selector('.Step1AddProperty_selectItem__LEkr8');
const map = Selector('#Map_mapContainer__PF_aQ');
const pin = Selector('#Map_mapContainer__PF_aQ [class^="leaflet-marker-icon leaflet-zoom-animated leaflet-"]')

const step3Link = Selector('#AddPropertyNavigation_links__NYBLK a').withText('3');
const step3Title = Selector('h1').withText('Step Three: Pricing and Guests');

const basicPriceInput = Selector('#pricePerNight');
const acceptChildrenToggle = Selector('label').withText('Accept Children');
const acceptPetsToggle =  Selector('label').withText('Accept Pets');
const disabledFriendly = Selector('label').withText('Disability Friendly')

const minGuestInput = Selector('#minGuests');
const maxGuestInput = Selector('#maxGuests')

const numBedroomInput = Selector('#numBedrooms')
const numBathroomInput  = Selector('#numBathrooms')

const numDoubleBeds = Selector('#doubleBeds');

const step3Submit = Selector('#AddPropertyNavigation_submitButtonArea__rSgXi button').withText('Save and continue')







const step4Link = Selector('#AddPropertyNavigation_links__NYBLK a').withText('4');
const lastStep = Selector('#AddPropertyNavigation_links__NYBLK a').withText('5');
const getPageUrl = ClientFunction(() => window.location.href);

const step4Title =  Selector('h1').withText('Step Four: Amenities')

// step 4 buttons and labels

const healthAndSafetyButton = Selector('#healthAndSafety');
const fireAlarmToggle = Selector('label').withText('Fire Alarm')
const kitchenButton =  Selector('#kitchen')
const kitchenToggle = Selector('label').withText('Kitchen')
const entertainmentButton = Selector('#entertainment')
const wifiToggle = Selector('label').withText('Wi-Fi');

const transportButton = Selector('#transport');
const garageToggle = Selector('label').withText('Garage');

const laundryButton = Selector('#laundry');
const washingMachineToggle = Selector('label').withText('Washing Machine');


const climateControlButton = Selector('#climateControl');
const airConditioningToggle = Selector('label').withText('Air conditioning');


const waterButton = Selector('#water');
const drinkingWaterToggle = Selector('label').withText('Drinking Water');


const beautyButton = Selector('#beauty');
const hairDryerToggle = Selector('label').withText('Hair Dryer');



// step 4 buttons end
const step4Submit = Selector('#AddPropertyNavigation_submitButtonArea__rSgXi button').withText('Save and continue');
const lastPageTitle = Selector('h1').withText('Final Step: Description');
const lastStepSubmit = Selector('#AddPropertyNavigation_submitButtonArea__rSgXi button').withText('Thank you for going through all the steps. Click h');

const sandc = Selector('#Step1AddProperty_formSelect__euAqA button').withText('Save and continue');

// https://stackoverflow.com/questions/66908694/how-to-set-local-storage-in-testcafe-before-the-page-initialization
const getLocalStorageItem = ClientFunction((key) => window.localStorage.getItem(key));


fixture('Booking')
    .page('http://localhost:3000/en/login');


test('Verify customer user type cannot access manage properties', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)
        .typeText(emailInput, "testcustomer@mail.com")
        .typeText(passwordInput, "testcustomer1!")
        .click(loginButton)
        .wait(1000)

        .navigateTo('http://localhost:3000/en/profile/manage-properties')

        .expect(getPageUrl()).eql('http://localhost:3000/en')
});

test('Verify invalid location message', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)
        .typeText(emailInput, "testhost@mail.com")
        .typeText(passwordInput, "testhost1!")
        .click(loginButton)
        .wait(1000)

        .hover(profileButton)
        .click(manageProfileArea)
        .expect(getPageUrl()).eql('http://localhost:3000/en/profile/manage-properties')
        .click(addNewPropertyLink)
        .expect(getPageUrl()).eql('http://localhost:3000/en/add-property/step1')
        
        const mapok = await map.with({ visibilityCheck: true })();

        await t
        .typeText(inputAddress, "10 Pl. de la Concorde, 75008 Paris, France")
        .click(searchButton)
        .click(addressFirstOption)
        const pinok = await pin.with({ visibilityCheck: true })();
        await t
        .click(sandc)
        const history = await t.getNativeDialogHistory();
        console.log(history)
        const historyItem = history[0].text
        await t
            .expect(historyItem).eql("Sorry we are not supporting that location yet")
});

test('Verify all empty error on submit', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)
        .typeText(emailInput, "testhost@mail.com")
        .typeText(passwordInput, "testhost1!")
        .click(loginButton)
        .wait(1000)

        .hover(profileButton)
        .click(manageProfileArea)
        .expect(getPageUrl()).eql('http://localhost:3000/en/profile/manage-properties')
        .click(addNewPropertyLink)
        .expect(getPageUrl()).eql('http://localhost:3000/en/add-property/step1')
        
        const mapok = await map.with({ visibilityCheck: true })();

        await t
        .click(lastStep)
        const pageOk = await lastPageTitle.with({ visibilityCheck: true })();
        await t
            .click(lastStepSubmit);
        const history = await t.getNativeDialogHistory();
        console.log(history)
        const historyItem = history[0].text
        await t
            .expect(historyItem).eql("Step 1 is incomplete, Step 2 is incomplete, Step 3 is incomplete, Step 4  is incomplete");
});

test('Verify all empty error on submit', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)
        .typeText(emailInput, "testhost@mail.com")
        .typeText(passwordInput, "testhost1!")
        .click(loginButton)
        .wait(1000)

        .hover(profileButton)
        .click(manageProfileArea)
        .expect(getPageUrl()).eql('http://localhost:3000/en/profile/manage-properties')
        .click(addNewPropertyLink)
        .expect(getPageUrl()).eql('http://localhost:3000/en/add-property/step1')
        
        const mapok = await map.with({ visibilityCheck: true })();

        await t
        .click(lastStep)
        const pageOk = await lastPageTitle.with({ visibilityCheck: true })();
        await t
            .click(lastStepSubmit);
        const history = await t.getNativeDialogHistory();
        console.log(history)
        const historyItem = history[0].text
        await t
            .expect(historyItem).eql("Step 1 is incomplete, Step 2 is incomplete, Step 3 is incomplete, Step 4  is incomplete");
});

test('Verify step 4 OK', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)
        .typeText(emailInput, "testhost@mail.com")
        .typeText(passwordInput, "testhost1!")
        .click(loginButton)
        .wait(1000)

        .hover(profileButton)
        .click(manageProfileArea)
        .expect(getPageUrl()).eql('http://localhost:3000/en/profile/manage-properties')
        .click(addNewPropertyLink)
        .expect(getPageUrl()).eql('http://localhost:3000/en/add-property/step1')
        
        const mapok = await map.with({ visibilityCheck: true })();

        await t
        .click(step4Link)
      
        const pageOk = await lastPageTitle.with({ visibilityCheck: true })();
        await t
            .click(healthAndSafetyButton)
            .click(fireAlarmToggle)
            .expect(fireAlarmToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(healthAndSafetyButton)

            .click(kitchenButton)
            .click(kitchenToggle)
            .expect(kitchenToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(healthAndSafetyButton)

            .click(entertainmentButton)
            .click(wifiToggle)
            .expect(wifiToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(entertainmentButton)

            .click(transportButton)
            .click(garageToggle)
            .expect(garageToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(transportButton)


            .click(laundryButton)
            .click(washingMachineToggle)
            .expect(washingMachineToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(laundryButton)

            .click(climateControlButton)
            .click(airConditioningToggle)
            .expect(airConditioningToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(climateControlButton)

            .click(waterButton)
            .click(drinkingWaterToggle)
            .expect(drinkingWaterToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(waterButton)

            .click(beautyButton)
            .click(hairDryerToggle)
            .expect(hairDryerToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(beautyButton)
            //.debug()

            .click(step4Submit)
        const step5pageok = await lastPageTitle.with({ visibilityCheck: true })();
        //await t.debug()
        const beautyLocalStorage = await getLocalStorageItem("beauty");
        const climateControlLocalStorage = await getLocalStorageItem("climateControl");
        const entertainmentLocalStorage = await getLocalStorageItem("entertainment");
        const healthAndSafetyLocalStorage = await getLocalStorageItem("healthAndSafety");
        const kitchenLocalStorage = await getLocalStorageItem("kitchen");
        const laundryLocalStorage = await getLocalStorageItem("laundry");
        const transportLocalStorage = await getLocalStorageItem("transport");
        const waterLocalStorage = await getLocalStorageItem("water");

        const beautyLocalStorageParsed = JSON.parse(beautyLocalStorage).hasHairDryer;
        const climateControlLocalStorageParsed = JSON.parse(climateControlLocalStorage).hasAirCon;
        const entertainmentLocalStorageParsed = JSON.parse(entertainmentLocalStorage).hasWifi;
        const healthAndSafetyLocalStorageParsed = JSON.parse(healthAndSafetyLocalStorage).hasFireAlarm
        const kitchenLocalStorageParsed = JSON.parse(kitchenLocalStorage).hasKitchen;
        const laundryLocalStorageParsed = JSON.parse(laundryLocalStorage).hasWashingMachine;
        const transportLocalStorageParsed = JSON.parse(transportLocalStorage).hasGarage;
        const waterLocalStorageParsed = JSON.parse(waterLocalStorage).hasDrinkingWater;




        //console.log("b " + beautyLocalStorageParsed)
        await t
            .expect(beautyLocalStorageParsed).eql(true)
            .expect(climateControlLocalStorageParsed).eql(true)
            .expect(entertainmentLocalStorageParsed).eql(true)
            .expect(healthAndSafetyLocalStorageParsed).eql(true)
            .expect(kitchenLocalStorageParsed).eql(true)
            .expect(laundryLocalStorageParsed).eql(true)
            .expect(transportLocalStorageParsed).eql(true)
            .expect(waterLocalStorageParsed).eql(true)
            .click(lastStepSubmit)
        const history = await t.getNativeDialogHistory();
        console.log(history)
        const historyItem = history[0].text
        await t
            .expect(historyItem).eql("Step 1 is incomplete, Step 2 is incomplete, Step 3 is incomplete");
});

test.only('Verify step 3 OK', async t => {
    await t
        .maximizeWindow()
        .wait(1000)
        //https://testcafe.io/documentation/402698/reference/test-api/testcontroller/getnativedialoghistory
        .setNativeDialogHandler(() => true)
        .typeText(emailInput, "testhost@mail.com")
        .typeText(passwordInput, "testhost1!")
        .click(loginButton)
        .wait(1000)

        .hover(profileButton)
        .click(manageProfileArea)
        .expect(getPageUrl()).eql('http://localhost:3000/en/profile/manage-properties')
        .click(addNewPropertyLink)
        .expect(getPageUrl()).eql('http://localhost:3000/en/add-property/step1')
        
        const mapok = await map.with({ visibilityCheck: true })();

        await t
        .click(step3Link)
        
        const pageOk = await step3Title.with({ visibilityCheck: true })();
        await t
            .typeText(basicPriceInput,"125",{ replace: true })
            .click(acceptChildrenToggle)
            //.debug()
            .expect(acceptChildrenToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(acceptPetsToggle)
            .expect(acceptPetsToggle.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
            .click(disabledFriendly)
            .expect(disabledFriendly.getStyleProperty('background-color')).eql("rgb(84, 173, 86)")
           // .debug()
            .typeText(minGuestInput,"1",{ replace: true })
            .typeText(maxGuestInput,"3",{ replace: true })
            .typeText(numBedroomInput,"3",{ replace: true })
            .typeText(numBathroomInput,"1",{ replace: true })
            .typeText(numDoubleBeds,"3",{ replace: true })
            .click(step3Submit)
        
        const step4pageok = await step4Title.with({ visibilityCheck: true })();
        await t 
            .click(lastStep)

        const step5pageok = await lastPageTitle.with({ visibilityCheck: true })();
        await t
            //.debug()
            .click(lastStepSubmit)
        const step3LocalStorage = await getLocalStorageItem("step3");

        const step3LocalStorageParsed = JSON.parse(step3LocalStorage);
        await t
            .expect(step3LocalStorageParsed.acceptsChildren).eql(true)
            .expect(step3LocalStorageParsed.acceptsPets).eql(true)
            .expect(step3LocalStorageParsed.disabilityFriendly).eql(true)
            .expect(step3LocalStorageParsed.doubleBeds).eql("3")
            .expect(step3LocalStorageParsed.hammocks).eql(0)
            .expect(step3LocalStorageParsed.maxGuests).eql("3")
            .expect(step3LocalStorageParsed.minGuests).eql("1")
            .expect(step3LocalStorageParsed.numBathrooms).eql("1")
            .expect(step3LocalStorageParsed.numBedrooms).eql("3")
            .expect(step3LocalStorageParsed.priceIncreasePerPerson).eql(0)
            .expect(step3LocalStorageParsed.pricePerNight).eql("125")
            .expect(step3LocalStorageParsed.singleBeds).eql(0)
            .expect(step3LocalStorageParsed.sofaBeds).eql(0)
            // .expect(step3LocalStorageParsed.maxGuests).eql(3)

        /**
         * acceptsChildren
            : 
            true
            acceptsPets
            : 
            true
            disabilityFriendly
            : 
            true
            doubleBeds
            : 
            "3"
            hammocks
            : 
            0
            maxGuests
            : 
            "3"
            minGuests
            : 
            "1"
            numBathrooms
            : 
            "1"
            numBedrooms
            : 
            "3"
            priceIncreasePerPerson
            : 
            0
            pricePerNight
            : 
            "125"
            singleBeds
            : 
            0
            sofaBeds
            : 
            0
         */
        const history = await t.getNativeDialogHistory();
        //console.log(history)
        const historyItem = history[0].text
        await t
            .expect(historyItem.trim()).eql("Step 1 is incomplete, Step 2 is incomplete, Step 4  is incomplete");
});