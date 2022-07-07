import React from "react";
import CollaboratorRegistration from "../../../../components/collaborator/register";
import { VALIDATIONS } from "../../../../utils/UI-Constants";
import { useRouter } from "next/router";
import Firebase from "../../../../firebase";
import { generatePassword } from "../../../../utils/PasswordGenerator";
import { toast } from "react-toastify";
import { uuid as v4 } from "uuidv4";
import { useAuth } from "../../../../authUserProvider";
import { paths } from "../../../../utils/paths";
import { collaboratorTypeOptions } from "../../../../utils/UI-Constants";
import AdminLayout from "../../../../components/admin-layout";
export async function getServerSideProps(context) {
  const sendGridTemplateId =
    process.env.NEXT_PUBLIC_SENDGRID_TEMPLATE_ID_EMAIL_VERIFICATION;

  return {
    props: {
      sendGridTemplateId,
    }, // will be passed to the page component as props
  };
}

function CollaboratorRegistrationPage({ sendGridTemplateId }) {
  const router = useRouter();
  const locationId = router.query.locationId;
  const { createUserWithEmailAndPassword } = useAuth();
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

  const handleOnCreateUser = async (email, password, confirmPassword) => {
    let userId = "";
    let activationHash = "";
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (
      VALIDATIONS.REQUIRED_FREE_TEXT(password) &&
      VALIDATIONS.REQUIRED_FREE_TEXT(confirmPassword) &&
      VALIDATIONS.PASSWORD(password) &&
      password === confirmPassword
    ) {
      const authUser = await createUserWithEmailAndPassword(email, password);

      const response = await fetch("/api/setActivationRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          to: email,
          templateId: sendGridTemplateId,
          activationType: "COLLABORATOR",
          userId: authUser.user.uid,
          email: email,
          password: password,
          locationId: locationId,
        }),
      });

      if (response.status === 202) {
        userId = authUser.user.uid;
        toast.success(
          "Usuario creado con éxito, le hemos enviado un correo para activar su cuenta."
        );

        const data = await response.json();
        activationHash = data.activationHash;
      } else {
        toast.error(
          "No pudimos enviarte en codigo de activación, por favor intente más tarde."
        );
      }
    } else {
      toast.error("La contraseña no coincide");
    }

    return { userId, activationHash };
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
  const handleActivationRecord = async (userId) => {
    const db = Firebase.default.firestore();
    await db.collection("ActivationRecords").doc(userId).update({
      registered: true,
      registeredOnUTC: new Date().toISOString(),
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

    const password = generatePassword();

    const { userId } = await handleOnCreateUser(
      formValues.email,
      password,
      password
    );

    await upload(userId, formValues.images);
    await handleCompleteRegistration(userId, formValues);
    await handleActivationRecord(userId);

    toast.success("Registro completado existosamente");
    router.push(paths.ADMIN.DASHBOARD());
  };

  return (
    <AdminLayout>
      <CollaboratorRegistration
        title="Registro Collaborador HUBI"
        description={"Un gusto verte, por favor complete sus datos."}
        formValidatorConfig={validatorConfig}
        onContinueClicked={handleContinueClicked}
        collaboratorOptions={collaboratorTypeOptions}
      ></CollaboratorRegistration>
    </AdminLayout>
  );
}

export default CollaboratorRegistrationPage;
