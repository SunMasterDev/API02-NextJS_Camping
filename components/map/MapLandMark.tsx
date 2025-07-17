'use client'

import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

type LatLng =[number,number] //จัดการ type
type LocationMarkerProps ={ //จัดการ type LocationMarker
  position:LatLng | null
  setPosition:(position:LatLng)=>void
}
function LocationMarker({ position, setPosition }:LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      const newLocation: LatLng =[e.latlng.lat,e.latlng.lng] //จัดการ type setPosition
      setPosition(newLocation)
      map.flyTo(e.latlng)
    },
  })
  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const MapLandMark = ({location}:{ location?: { lat: number, lng: number } }) => { //จัดการ type location ชื่อเหมือนกัน
  const defaultLocation: LatLng = [13, 100] //จัดการ type LatLng
  const [position, setPosition] = useState<LatLng | null>(null) //<LatLng | null> จัดการ type
  console.log(position);
  
  return (
    <>
      <h1 className='mt-4 font-semibold'>Where Are You?</h1>
      <input name='lat' type='hidden' value={position ? position[0] : ''}/>
      <input name='lng' type='hidden' value={position ? position[1] : ''}/>
      <MapContainer className='h-[50vh] rounded-lg z-0 relative mt-6'
        center={location || defaultLocation } zoom={7} scrollWheelZoom={true}>
        

        <Marker position={location || defaultLocation } icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <LocationMarker position={position} setPosition={setPosition} />

        <LayersControl>
          <LayersControl.BaseLayer name='OpenStreetMap' checked>
              <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name='Esri.WorldImagery'>
              <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
          </LayersControl.BaseLayer>
        </LayersControl>

      </MapContainer>
    </>
  )
}
export default MapLandMark