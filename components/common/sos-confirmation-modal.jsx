import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ModalContainer from "./modal";
import { toast } from "react-toastify";

function SosConfirmationModal({ onCancel, userId, locationId }) {
  const COUNTDOWN_IN_SECONDS = 10;

  const [counter, setCounter] = useState(COUNTDOWN_IN_SECONDS);
  const intervalRef = useRef(null);

  const handleStopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setCounter(COUNTDOWN_IN_SECONDS);
    }
    onCancel();
  };

  const handleSendNotification = async () => {
    const response = await fetch(`/api/sendSms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId,
        locationId,
      }),
    });

    if (response.status === 200) {
      toast.success(
        "Usuario creado con éxito, le hemos enviado un correo para activar su cuenta."
      );
    } else {
      toast.error(
        "No pudimos enviarte en codigo de activación, por favor intente más tarde."
      );
    }
  };

  const handleStartCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => {
        const localCounter = prevCounter - 1;
        if (localCounter <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return localCounter;
      });
    }, 1000);
  };

  useEffect(() => {
    if (counter == COUNTDOWN_IN_SECONDS) handleStartCounter();
    if (counter == 0) handleSendNotification();
  }, [counter]);

  return (
    <ModalContainer onCancel={handleStopCounter}>
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold text-center">
          {"Ante una emergencia notificaremos a sus contactos."}
        </span>
        <span className="text-sm text-center">
          {
            "Pasado el tiempo, se procederá a notificar la emergencia. Puede cancelar en cualquier momento."
          }
        </span>
        <span className="py-2 text-2xl font-bold text-red-500 text-center">
          {counter === 0 ? "Notificación enviada." : counter}
        </span>
        <div className="flex mt-4 flex-row-reverse">
          <button
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleStopCounter}
          >
            {counter === 0 ? "Cerrar" : "Cancelar"}
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}

export default SosConfirmationModal;
