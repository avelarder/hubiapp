import { createContext, useContext, Context } from "react";
import useLocation from "./useLocation";

const locationContext = createContext({
  locationId: "",
  setLocation: (locationId) => {},
  clear: () => {},
});

export function LocationProvider({ children }) {
  const { location } = useLocation();

  return (
    <locationContext.Provider value={location}>
      {children}
    </locationContext.Provider>
  );
}

export const useLocationContext = () => useContext(locationContext);
