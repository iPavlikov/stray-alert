'use client';

import { useMap } from '@/providers/map-provider';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { getPopupPosition } from './helpers/get-popup-position';

const MarkerWithPopup = ({ mapRef, place, selected, selectPlace }) => {
  const markerRef = useRef(null);
  const popupRef = useRef(null);
  const [position, setPosition] = useState({
    visibility: 'hidden',
    opacity: '0',
  });

  const updatePositionAndShow = useCallback(() => {
    const map = mapRef?.current?.container;
    const marker = markerRef?.current;
    const popup = popupRef?.current;

    if (!map || !marker || !popup) return;

    setPosition({
      ...getPopupPosition(map, popup, marker),
      visibility: 'visible',
      opacity: '1',
    });
  }, [mapRef]);

  useEffect(() => {
    if (selected) updatePositionAndShow();
  }, [selected, updatePositionAndShow]);

  const { reactifyApi } = useMap();

  const { YMapMarker } = reactifyApi;

  return (
    <YMapMarker
      key={place.id}
      zIndex={selected ? 10 : 1}
      coordinates={[place.longitude, place.latitude]}
    >
      <div
        onMouseEnter={() => selectPlace(place.id)}
        onMouseLeave={() => selectPlace(null)}
      >
        <div
          ref={markerRef}
          className="absolute bottom-0 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div
            className={`text-white whitespace-nowrap py-1 px-2 rounded text-sm shadow ${
              selected ? 'bg-slate-600' : 'bg-slate-700'
            }`}
          >
            {place.label}
          </div>
        </div>
        {selected ? (
          <div
            ref={popupRef}
            className="absolute transform -translate-x-1/2 transition-opacity"
            style={{ ...position }}
          >
            <div className="bg-slate-700 text-slate-300 min-w-[320px] p-4 rounded-lg text-sm shadow w-full h-full">
              <div className="text-lg text-white">{place.label}</div>
              <div className="text-sm">{place.text}</div>
            </div>
          </div>
        ) : null}
      </div>
    </YMapMarker>
  );
};

export default memo(MarkerWithPopup);