'use client';

import { useMap } from '@/providers/map-provider';

export const Map = () => {
  const { reactifyApi } = useMap();

  if (!reactifyApi)
    return (
      <div className="flex-1 relative">
        {/* Replace this div with an actual map component */}
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <p className="text-2xl text-gray-600">Stray Alert Interactive Map</p>
        </div>
      </div>
    );

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
    reactifyApi;

  return (
    <div className="flex-1 relative">
      <div className="absolute top-0 right-0 bottom-0 left-0 inset-0 bg-gray-200 flex items-center justify-center">
        <YMap location={{ center: [37.6173, 55.7558], zoom: 9 }}>
          {/* Add a map scheme layer */}
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
        </YMap>
      </div>
    </div>
  );
};
