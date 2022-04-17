import React from "react";
import ModalContainer from "../common/modal";
import PostActionBar from "../post/shared/post-action-bar";

function RegisterEmployee(onCancel) {
  return (
    <ModalContainer onCancel={onCancel}>
      <h3
        className="text-lg leading-6 font-medium text-gray-900 text-center mb-4"
        id="modal-title"
      >
        Crear Empleado
      </h3>

      <PostActionBar
        state={postActionBarStatus}
        onCancel={onCancel}
        onNext={handlePostDataChange}
        onBack={onBack}
        isScheduled={scheduleEnabled}
        isNextDisabled={isFormValid}
        onPublish={handlePostDataSubmit}
      ></PostActionBar>
    </ModalContainer>
  );
}

export default RegisterEmployee;
