import React, { useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../authUserProvider";
import Firebase from "../../../firebase";
import { toast } from "react-toastify";
import NewLayout from "../../../components/newLayout";
import CollaboratorRegistration from "../../../components/collaborator/register";

import {
  VALIDATIONS,
  collaboratorTypeOptions,
} from "../../../utils/UI-Constants";

import { uuid as v4 } from "uuidv4";
import { paths } from "../../../utils/paths";

function EmployeeCreatePage() {
  const router = useRouter();
  const { authUser } = useAuth();

  const validatorConfig = {
    firstName: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Nombre es requerido.",
    },
    lastName: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Apellidos son requeridos.",
    },
    phone: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS(content);
      },
      message: "El número de celular es requerido.",
    },
    address: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Ingrese dirección.",
    },

    email: {
      validate: (content) => {
        return VALIDATIONS.EMAIL(content);
      },
      message: "Ingrese su correo electrónico.",
    },

    documentId: {
      validate: (content) => {
        return VALIDATIONS.ONLY_NUMBERS(content);
      },
      message: "Reingrese su documento de identidad.",
    },
  };

  const handleEmployeeDocumentsLink = async (collaboratorId, url) => {
    const db = Firebase.default.firestore();
    const documentId = v4();

    await db.collection("Collaborators_Documents").doc(documentId).set({
      url: url,
      collaboratorId: collaboratorId,
      status: "ACTIVE",
      createdOnUTC: new Date().toISOString(),
      updatedOnUTC: new Date().toISOString(),
    });
  };

  const upload = async (collaboratorId, images) => {
    const storage = Firebase.default.storage();

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      const fileURL = `/files/collaborators/${collaboratorId}/${element.name}`;
      const refToFile = storage.ref(fileURL);

      const uploadTask = refToFile.put(element);
      await handleEmployeeDocumentsLink(collaboratorId, fileURL);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.info("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.info("Upload is paused");
              break;
            case "running":
              console.info("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        async () => {
          // Handle successful uploads on complete
          console.info("Upload completed");
        }
      );
    }
  };

  const handleCompleteRegistration = async (
    collaboratorId,
    collaboratorData
  ) => {
    const db = Firebase.default.firestore();

    await db
      .collection("Collaborators")
      .doc(collaboratorId)
      .set({
        fullName: `${collaboratorData.firstName} ${collaboratorData.lastName}`,
        firstName: collaboratorData.firstName,
        lastName: collaboratorData.lastName,
        phoneArea: collaboratorData.phoneArea,
        phone: collaboratorData.phone,
        dobDay: collaboratorData.dobDay,
        dobMonth: collaboratorData.dobMonth,
        dobYear: collaboratorData.dobYear,
        email: collaboratorData.email,
        documentType: collaboratorData.documentType,
        documentId: collaboratorData.documentId,
        address: collaboratorData.address,
        gender: collaboratorData.gender,
        dobYear: collaboratorData.dobYear,
        dobMonth: collaboratorData.dobMonth,
        dobDay: collaboratorData.dobDay,
        status: collaboratorData.status,
        collaboratorType: collaboratorData.collaboratorType,
        collaboratorTypeText: collaboratorData.collaboratorType.text,
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

  const handleContinueClicked = async (event, formValues) => {
    event.preventDefault();

    if (
      !validatorConfig.firstName.validate(formValues.firstName) ||
      !validatorConfig.lastName.validate(formValues.lastName) ||
      !validatorConfig.phone.validate(formValues.phone) ||
      !validatorConfig.email.validate(formValues.email) ||
      !validatorConfig.documentId.validate(formValues.documentId) ||
      !validatorConfig.address.validate(formValues.address)
    ) {
      toast.warning("Por favor complete el formulario.");
      return;
    }

    if (formValues.images.length === 0) {
      toast.warning("No se ha seleccionado ningún archivo.");
      return;
    }

    const collaboratorId = v4();
    await upload(collaboratorId, formValues.images);
    await handleCompleteRegistration(collaboratorId, formValues);

    toast.success("Registro completado existosamente");
    router.push(paths.COLLABORATORS.LIST());
  };

  return (
    <NewLayout>
      <div className="flex items-start h-screen">
        <div className="flex xs:w-1/6"></div>
        <div className="flex flex-col  xs:w-4/6  items-left  align-middle mt-10">
          <CollaboratorRegistration
            title="Registro Colaborador HUBI"
            formValidatorConfig={validatorConfig}
            onContinueClicked={handleContinueClicked}
            collaboratorOptions={collaboratorTypeOptions.filter(
              (x) => x.id != "ADMINISTRATOR"
            )}
          ></CollaboratorRegistration>
        </div>
        <div className="flex xs:w-1/6"></div>
      </div>
    </NewLayout>
  );
}

export default EmployeeCreatePage;
