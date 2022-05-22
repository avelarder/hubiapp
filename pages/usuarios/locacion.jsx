import React from "react";
import Firebase from "../../firebase";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import Select from "../../components/common/select";
import { useState, useEffect } from "react";
import { useAuth } from "../../authUserProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function LocationPage() {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const db = Firebase.default.firestore();
  const [location, setLocation] = useState({
    id: "SELECT",
    text: "Seleccione locación",
  });
  const [profile, setProfile] = useState({
    id: "SELECT",
    text: "Seleccione un perfil",
  });
  const [profileType, setProfileType] = useState("");

  useEffect(() => {
    if (!loading && !authUser) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, loading]);

  const locationQuery = db.collection("Locations");

  //TODO: Remove as the values exists on the user profile context
  const profilesQuery = db
    .collection("UserProfiles")
    .where("userId", "==", authUser ? authUser.uid : "");

  const {
    data: locationData,
    status: locationStatus,
    error: locationError,
  } = useFirestoreQuery(locationQuery);

  const {
    data: userProfileData,
    status: userProfiletatus,
    error: userProfileError,
  } = useFirestoreQuery(profilesQuery);

  if (locationStatus === "loading" || userProfiletatus === "loading") {
    return (
      <div className="flex justify-center items-center w-full bg-purple-100 h-10 text-xs text-purple-500">
        Los datos se están cargando, un momento por favor.
      </div>
    );
  }

  const handleContinue = async () => {
    if (location.id === "SELECT") {
      toast.warning("Seleccione una Locación");
      return;
    }
    if (profile.id === "SELECT") {
      toast.warning("Seleccione una Locación");
      return;
    }

    const response = await fetch("/api/setLocationProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId: authUser.uid,
        locationId: location.id,
        profileId: profile.id,
        profileType: profileType,
      }),
    });

    if (response.status === 200) {
      toast.success("Locación se ha asignado correctamente");
    } else {
      toast.error("No pudo asignarse la Locación seleccionada.");
    }
    const data = await response.json();
    router.push(data.target);
  };

  return (
    <div>
      <Select
        title={"Seleccione un perfil:"}
        showTitle={true}
        options={userProfileData.map((doc) => ({
          id: doc.id,
          text: doc.profile === "COLLABORATOR" ? "Colaborador" : "Residente",
        }))}
        selectedOption={profile}
        onOptionChanged={(value) => {
          setProfile(value);
          setProfileType(
            userProfileData.find((doc) => doc.id === value.id).profile
          );
        }}
      ></Select>

      <Select
        title={"Seleccione su locación:"}
        showTitle={true}
        options={locationData.map((doc) => ({
          id: doc.id,
          text: doc.Title,
        }))}
        selectedOption={location}
        onOptionChanged={setLocation}
      ></Select>

      <button
        onClick={handleContinue}
        className="h-10 w-full rounded-md bg-purple-600 bg-opacity-100 text-white hover:bg-purple-700"
      >
        Continue
      </button>
      <button className="h-10 w-full rounded-md bg-gray-200 bg-opacity-100 text-white hover:bg-gray-300">
        Continue without location
      </button>
    </div>
  );
}

export default LocationPage;
