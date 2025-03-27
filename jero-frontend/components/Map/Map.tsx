

import { Circle, MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import style from "./Map.module.css"
import { LatLng } from "leaflet"

interface Props {
  position : any
  zoom : number;
  isCircle : boolean; 
}

const Map = (props: Props) => {
// https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c
  return(
  <div id={style.container}>
  <MapContainer center={props.position} zoom={props.zoom} scrollWheelZoom={false} id={style.mapContainer} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      props.isCircle 
      ?
        <Circle center={props.position} radius={200}/>
      :
        <Marker position={props.position}> 
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> 
    }
    

  </MapContainer>
  </div>
  )
}

export default Map