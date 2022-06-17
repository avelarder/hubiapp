import React from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { ClockIcon, XIcon } from "@heroicons/react/solid";
import { StyledButton } from "../../admin/base-ui-components";

function PostActionBar({
  state,
  isScheduled,
  onPublish,
  onCancel,
  onNext,
  onBack,
}) {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      {state.publishEnabled && (
        <StyledButton
          type="button"
          className=" inline-flex justify-center items-center"
          onClick={onPublish}
          autoFocus
        >
          {!isScheduled ? (
            <>
              <ShareIcon className="w-5 h-5 mr-2"></ShareIcon>Publicar
            </>
          ) : (
            <>
              <ClockIcon className="w-5 h-5 mr-2"></ClockIcon>Programar
            </>
          )}
        </StyledButton>
      )}

      {state.nextEnabled && (
        <StyledButton
          type="button"
          className="w-full inline-flex justify-center items-center"
          onClick={onNext}
          autoFocus
        >
          <ArrowRightIcon className="w-5 h-5 mr-2"></ArrowRightIcon>Siguiente
        </StyledButton>
      )}
      {state.backEnabled && (
        <StyledButton
          type="button"
          className="w-full inline-flex justify-center items-center"
          onClick={onBack}
          autoFocus
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2"></ArrowLeftIcon>Atrás
        </StyledButton>
      )}
      {state.closeEnabled && (
        <StyledButton
          autoFocus
          type="button"
          className="inline-flex justify-center items-center "
          onClick={onCancel}
        >
          <XIcon className="w-5 h-5 mr-2"></XIcon>Cerrar
        </StyledButton>
      )}
    </div>
  );
}

export default PostActionBar;
