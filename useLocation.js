import { useState, useEffect } from "react";



export default function useLocation() {
  const [location, setLocationObject] = useState(
    "Default"
  );

  const clear = () => {
    setLocationObject(null);
    localStorage.removeItem(hubi_location);
  };

  const setLocation = (locationId) => {

    setLocationObject(locationId);
  };

  return {
    location,
    setLocation,
    clear,
  };
}
