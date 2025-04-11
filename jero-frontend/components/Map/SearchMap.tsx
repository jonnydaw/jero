
import { Circle, MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import style from "./SearchMap.module.css"
import { LatLng, LatLngExpression } from "leaflet"
import { PropertyAttribute } from "@/types/types"
import { LiaEthereum } from "react-icons/lia"

interface Props {
  propertyAttributes : PropertyAttribute[];
  zoom : number;
}

const SearchMap = (props: Props) => {
    
    let sumLats : number = 0
    let sumLons : number = 0
    let count : number = 0;

    const newlatLongs: number[][] = []
    const seenLats: Set<Number> = new Set();
    const seenLons : Set<Number> = new Set();

    props.propertyAttributes.forEach((property) => {
        const positiveOrNegative = Math.round(Math.random()) === 1 ? 1 : -1;
        let currentLat : number = Number(property.lat);
        let currentLon: number = Number(property.lon);
        sumLats += currentLat;
        sumLons +=  currentLon;
        while(seenLats.has(currentLat)){
            currentLat += 0.0015 * positiveOrNegative;
        }
        while(seenLons.has(currentLon)){
            currentLon += 0.0015 * positiveOrNegative;
        }
        newlatLongs[count] = [currentLat,currentLon];
        seenLons.add(currentLon);
        seenLats.add(currentLat);
        count++;
    });
    console.log(newlatLongs);
    console.log(seenLats)
    console.log(seenLons)
    const avglat = count > 0 ? sumLats / count : 0;
    const avgLons = count > 0 ? sumLons / count : 0;
    // const averageLon = average(lons);


// https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c
  return(
  <div id={style.container}>
  <MapContainer center={[avglat,avgLons]} zoom={props.zoom} scrollWheelZoom={false} id={style.mapContainer} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
   { props.propertyAttributes.map((property, idx) => (
    <div key={idx}>
        <Circle
            center={[newlatLongs[idx].at(0) || 0, newlatLongs[idx]!.at(1) || 0]} 
            radius={200}
        >
            {/* https://react-leaflet.js.org/docs/example-tooltips/ */}
        <Tooltip direction="top" offset={[0, 20]} opacity={1} permanent>
            £{property.pricePerNight}
        </Tooltip>
        </Circle>




      </div>    
    ))}
 
    
    

  </MapContainer>
  </div>
  )
}

export default SearchMap