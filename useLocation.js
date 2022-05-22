import { useState, useEffect } from "react";

export default function useLocation() {
  const [location, setLocationObject] = useState(
    localStorage.getItem("hubi_location") ?? "Default"
  );

  const clear = () => {
    setLocationObject(null);
    localStorage.removeItem(hubi_location);
  };

  const setLocation = (locationId) => {
    localStorage.setItem("hubi_location", locationId);
    setLocationObject(locationId);
  };

  return {
    location,
    setLocation,
    clear,
  };
}
