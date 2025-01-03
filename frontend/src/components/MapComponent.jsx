import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon, InfoWindow } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@/config/API_KEYS';

const center = {
    lat: 19.0330,
    lng: 73.0297,
};

const polygonCoords = [
    { lat: 19.0330, lng: 73.0297 },
    { lat: 19.0350, lng: 73.0310 },
    { lat:  20.073402777777776, lng: 80.07472222222222 },
    { lat: 19.0330, lng: 73.0297 },
];

const MapComponent = ({ locationMappings }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerClassName="w-full h-auto" center={center} zoom={15}>
                {/* Render a Marker for each location in locationMappings */}
                {locationMappings &&
                    locationMappings.map((mapping, index) => (
                        <Marker
                            key={index}
                            position={{ lat: mapping.location.latitude, lng: mapping.location.longitude }}
                            onClick={() => setSelectedLocation(mapping)}
                        />
                    ))}

                <Marker
                    position={center}
                    onClick={() => setSelectedLocation(center)}
                />

                {selectedLocation && (
                    <InfoWindow
                        position={{
                            lat: selectedLocation.location.latitude,
                            lng: selectedLocation.location.longitude,
                        }}
                        onCloseClick={() => setSelectedLocation(null)}
                    >
                        <div className="p-2">
                            <h3 className="text-lg font-bold mb-1">Location Info</h3>
                            <p><strong>Latitude:</strong> {selectedLocation.location.latitude}</p>
                            <p><strong>Longitude:</strong> {selectedLocation.location.longitude}</p>
                            <p><strong>Severity:</strong> {selectedLocation.severity}</p>
                        </div>
                    </InfoWindow>
                )}


                <Polygon
                    paths={polygonCoords}
                    options={{
                        fillColor: 'lightblue',
                        fillOpacity: 0.5,
                        strokeColor: 'blue',
                        strokeOpacity: 1,
                        strokeWeight: 2,
                    }}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
