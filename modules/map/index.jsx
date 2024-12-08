'use client';

import { useMap } from '@/providers/map-provider';
import { useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import MarkerWithPopup from './marker-with-popup';

const DEFAULT_LOCATION = { center: [37.6173, 55.7558], zoom: 9 };

export const Map = ({ places, isLoading }) => {
  const mapRef = useRef(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const { reactifyApi } = useMap();

  const debouncedSetLocation = useDebouncedCallback(setLocation, 500);

  if (!reactifyApi || isLoading)
    return <p className="text-2xl text-gray-600">Загрузка карты...</p>;

  const {
    YMap,
    YMapListener,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
  } = reactifyApi;

  return (
    <YMap location={location} ref={mapRef}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      <YMapListener
        onUpdate={({ location }) => {
          debouncedSetLocation(location);
        }}
      />

      {places
        ? places.map((place) => (
            <MarkerWithPopup
              key={place.id}
              place={place}
              mapRef={mapRef}
              selected={selectedPlaceId === place.id}
              selectPlace={setSelectedPlaceId}
            />
          ))
        : null}
    </YMap>
  );
};
