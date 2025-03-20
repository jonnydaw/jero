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
}

export type PropertyAttributeFull = {    
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
    longitude : number;
    latitute : number;
    images : string[];
    healthAndSafety: HealthAndSafety;
    kitchen: Kitchen;
    transport: Transport;
    laundry: Laundry;
    climateControl: ClimateControl;
    water: Water;
    beauty: Beauty;
    entertainment: Entertainment;
    blockedDate : Date;

}



export interface UpdateFields {
    firstName: string;
    lastName : string;
    introduction : string;
    imgLink : string;
}