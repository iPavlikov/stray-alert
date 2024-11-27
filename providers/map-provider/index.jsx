import React, { createContext, useContext, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import Script from 'next/script';

export const MountedMapsContext = createContext({
  reactifyApi: null,
});

export const MapProvider = (props) => {
  const [reactifyApi, setReactifyApi] = useState(null);

  const contextValue = useMemo(() => ({ reactifyApi }), [reactifyApi]);

  return (
    <MountedMapsContext.Provider value={contextValue}>
      <Script
        src={props.apiUrl}
        onLoad={async () => {
          const [ymaps3React] = await Promise.all([
            ymaps3.import('@yandex/ymaps3-reactify'),
            ymaps3.ready,
          ]);
          const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
          setReactifyApi(reactify.module(ymaps3));
        }}
      />
      {props.children}
    </MountedMapsContext.Provider>
  );
};

export const useMap = () => useContext(MountedMapsContext);
