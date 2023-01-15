import React from "react";
import SosConfirmationModal from "./sos-confirmation-modal";
import { useState } from "react";
import { useAuth } from "../../authUserProvider";
import { useLocationContext } from "../../locationProvider";

function SosButton() {
  const { authUser } = useAuth();
  const { locationSelected } = useLocationContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex z-60">
      <button
        className="bg-red-600 rounded-full h-14 w-14 border-4 border-red-200 text-sm text-white font-bold hover:bg-red-700 "
        onClick={() => setShowModal(true)}
      >
        SOS
      </button>

      {showModal && (
        <SosConfirmationModal
          onCancel={() => setShowModal(false)}
          userId={authUser.uid}
          locationId={locationSelected.id}
        ></SosConfirmationModal>
      )}
    </div>
  );
}

export default SosButton;
