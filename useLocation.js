import { useState, useEffect } from "react";

export default function useLocation() {
  const [locationSelected, setLocationSelected] = useState({
    id: "DEFAULT",
    text: "Seleccione una locación",
    buildings: ["Seleccione"],
  });
  const [availableLocations, setAvailableLocationsState] = useState([]);

  const clear = () => {
    setLocationSelected({
      id: "DEFAULT",
      text: "Seleccione una locación",
      buildings: ["Seleccione"],
    });
  };

  const setSelectedLocation = (location) => {
    setLocationSelected(location);
  };

  const setAvailableLocations = (locations) => {
    setAvailableLocationsState(locations);
  };

  return {
    locationSelected,
    availableLocations,
    setSelectedLocation,
    setAvailableLocations,
    clear,
  };
}
