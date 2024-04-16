import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const AddressMap = ({ address }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pos, setPos] = useState([0,0]);
  const zoomLevel = 15;
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const convertAddressToCoordinates = async () => {
      if (address) {
        // Use OpenCage Geocoding API (replace YOUR_API_KEY with your actual API key)
        const apiKey = 'e6568df8578347fd9dfa0f013c910bde';
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${apiKey}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            setLatitude(lat);
            setLongitude(lng);
            setPos([lat,lng]);
            console.log(pos);   
          } else {
            console.log('No results found');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally{
            setIsLoading(false);
        }
      }
    };

    convertAddressToCoordinates();
  },[address]);


  if (isLoading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <MapContainer zoom={zoomLevel} center={pos} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={pos}>
        <Popup>
          Omu-Aran the Head Post of Igbomina land, 
          is a town in the Nigerian state of Kwara. 
          It originated from Ife and currently the local
          government headquarters of Irepodun local government.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default AddressMap;


  