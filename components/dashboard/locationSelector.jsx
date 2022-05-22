import React, { useState, useEffect } from "react";
import Select from "../../components/common/select";
import { useAuth } from "../../authUserProvider";
import useLocation from "../../useLocation";

function LocationSelector() {
  const { authUser } = useAuth();
  const {
    location: currentLocation,
    setLocation: setLocationContext,
  } = useLocation();

  const [locations, setLocations] = useState([{ id: "SELECCIONE", text: "" }]);

  useEffect(() => {
    if (authUser?.uid) {
      setLocations(
        authUser?.profiles?.map((profile) => {
          return {
            id: profile.locationId,
            text: profile.location,
          };
        })
      );
    }
  }, [authUser]);

  return (
    <div className="w-64">
      {locations && locations.length > 0 && (
        <Select
          options={locations}
          selectedOption={
            locations.length > 0 ? locations[0] : { id: "SELECCIONE", text: "" }
          }
          onOptionChanged={(value) => {
            setLocationContext(value.id);
          }}
        ></Select>
      )}
    </div>
  );
}

export default LocationSelector;
