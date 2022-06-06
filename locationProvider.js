import { createContext, useContext, Context } from "react";
import useLocation from "./useLocation";

const locationContext = createContext({
  locationSelected: {},
  availableLocations: [],
  setSelectedLocation: (location) => {},
  setAvailableLocations: (locations) => {},
  clear: () => {},
});

export function LocationProvider({ children }) {
  const locationInstance = useLocation();

  return (
    <locationContext.Provider value={locationInstance}>
      {children}
    </locationContext.Provider>
  );
}

export const useLocationContext = () => useContext(locationContext);
