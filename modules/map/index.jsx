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
};
