import React, { useState, useEffect } from "react";
import Select from "../../components/common/select";
import { useAuth } from "../../authUserProvider";
import { useLocationContext } from "../../locationProvider";

function LocationSelector() {
  const { authUser } = useAuth();
  const {
    locationSelected,
    availableLocations,
    setSelectedLocation,
    setAvailableLocations,
  } = useLocationContext();

  useEffect(() => {
    if (authUser?.uid && availableLocations.length === 0) {
      const mappedLocations = authUser?.profiles?.map((profile) => {
        return {
          id: profile.locationId,
          text: profile.location,
          buildings: profile.buildings,
        };
      });
      setAvailableLocations(mappedLocations);
      setSelectedLocation(mappedLocations[0]);
    }
  }, [
    authUser,
    availableLocations,
    setAvailableLocations,
    setSelectedLocation,
  ]);

  return (
    <div className="w-64">
      {availableLocations ? (
        <Select
          options={availableLocations}
          selectedOption={locationSelected}
          onOptionChanged={(value) => {
            setSelectedLocation(value);
          }}
        ></Select>
      ) : (
        <div>No hay ubicaciones disponibles</div>
      )}
    </div>
  );
}

export default LocationSelector;
