export type GuestManagement = {
    pricePerNight : number,
    priceIncreasePerPerson : number;
    acceptsChildren: boolean;
    acceptsPets : boolean;
    disabilityFriendly : boolean;
    minGuests : number;
    maxGuests : number;
    numBedrooms : number;
    numBathrooms : number;
    doubleBeds : number;
    singleBeds : number;
    hammocks : number;
    sofaBeds : number;
}

export type Amenities = {
    beautyData: Beauty, 
    climateData: ClimateControl, 
    entertainmentData: Entertainment, 
    healthAndSafetyData: HealthAndSafety, 
    kitchenData: Kitchen, 
    laundryData: Laundry, 
    transportData: Transport, 
    waterData :Water 
}

export type HealthAndSafety = {
    hasFireAlarm : boolean;
    hasCarbonMonoxideDetector : boolean;
    hasFireExtinguisher : boolean;
    hasFirstAidKit : boolean;
}

export type Kitchen = {
    hasKitchen : boolean;
    hasDishwasher : boolean;
    hasMicrowave : boolean;
    hasOven : boolean;
    hasHob : boolean;
    hasPotsAndPans : boolean;
    hasCutlery : boolean;
    hasCrockery : boolean;
    hasKettle : boolean;
    hasCoffeeMaker : boolean;
}

export type Transport = {
    hasGarage : boolean;
    hasOffStreetParking : boolean;
    hasOnStreetParking : boolean;
    hasReliablePublicTransportNearby : boolean;
}

export type Laundry = {
    hasWashingMachine: boolean;
    hasTumbleDryer: boolean;
    hasIron : boolean;
    hasDryingRack : boolean;
}

export type ClimateControl = {
    hasAirCon: boolean;
    hasFan : boolean;
    hasHeating : boolean;
    hasWoodBurningFire : boolean;
}

export type Water = {
    hasDrinkingWater : boolean;
    hasBath : boolean;
    hasPrivateToilet : boolean;
    hasJacuzzi : boolean;
    hasShower : boolean;
    hasBidet : boolean;
    hasSwimmingPool : boolean; 
}

export type Beauty = {
    hasHairDryer : boolean;
    hasHairStraightner : boolean;
    hasShampoo : boolean;
    hasConditioner : boolean;
    hasBodyWash : boolean;
}

export type Entertainment = {
    hasWifi : boolean;
    hasSmartTv : boolean;
    hasGym : boolean;
    hasBooks : boolean;
    hasBoardGames : boolean;
    hasLocalMuseums : boolean;
    hasLocalBars : boolean;
    hasLocalTheatres : boolean;
}

export type PropertyAttribute = {    
    id : string;
    displayLocation : string;
    pricePerNight : string;
    title : string;
    mainImage : string;
    percentile : number;
    extraGuestPriceIncrease : string;
    lat : number;
    lon : number;
}

export type ReviewType = {
    reviewDate : Date,
    userName : string,
    score : number;
    title : string;
    body : string;
}

export type  ProfileCardInfo = {
    fname : string;
        lname : string;
        intro : string;
        img : string;
}

export interface PropertyAttributeFull {    
    id : string;
    ownerId : string;
    title : string;
    description : string;
    pricePerNight: string;
    priceIncreasePerPerson : string,
    acceptsChildren : boolean;
    acceptsPets : boolean;
    disabilityFriendly : boolean;
    rules : string;
    numberDoubleBeds : number;
    numberSingleBeds : number;
    numberHammocks : number;
    numberSofaBeds : number;
    numBedrooms : number;
    numBathrooms : number;
    longitude : number;
    latitude : number;
    images : string[];
    healthAndSafety: HealthAndSafety;
    kitchen: Kitchen;
    transport: Transport;
    laundry: Laundry;
    climateControl: ClimateControl;
    water: Water;
    beauty: Beauty;
    entertainment: Entertainment;
    blockedDate : Date[];
    reviews : ReviewType[];
    reviewScore : number;
    profileInfo : ProfileCardInfo;
    maxGuests: number;
    minGuests: number;

}

export interface PropertyAttributeFullWithSecrets extends PropertyAttributeFull{
    guide : string;
    address: string;
}



export interface UpdateFields {
    firstName: string;
    lastName : string;
    introduction : string;
    imgULR : string;
}

export type BookingProperty = {
    propertyId: string;
    bookingId: string;
    title: string;
    image: string;
    start: Date;
    end: Date;
    numAdults: number;
    numChildren: number;
    numPets: number;
    totalCost: number;
    accepted : boolean;
    cancelled : boolean
    otherPartyInfo : UpdateFields;
  }