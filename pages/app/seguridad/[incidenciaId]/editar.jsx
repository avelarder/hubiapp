import React, { useRef } from "react";
import { useAuth } from "../../../../authUserProvider";
import Firebase from "../../../../firebase";
import { toast } from "react-toastify";
import NewLayout from "../../../../components/newLayout";

import { VALIDATIONS, incidentOptions } from "../../../../utils/UI-Constants";

import { uuid as v4 } from "uuidv4";
import { paths } from "../../../../utils/paths";
import { useLocationContext } from "../../../../locationProvider";
import IncidentEdit from "../../../../components/incidents/edit";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";
import Thumbnail from "../../../../components/common/thumbnail";
import { useRouter } from "next/router";

function IncidentEditPage() {
  const db = Firebase.default.firestore();
  const router = useRouter();
  const { query } = router;
  const incidentId = query.incidenciaId;

  const { locationSelected } = useLocationContext();
  const { authUser } = useAuth();

  const validatorConfig = {
    title: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Título es requerido.",
    },
    description: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Descripción del incidente es requerido.",
    },
  };

  const handleIncidentDocumentsLink = async (incidentId, url) => {
    const db = Firebase.default.firestore();
    const documentId = v4();

    await db.collection("Incident_Documents").doc(documentId).set({
      url: url,
      incidentId: incidentId,
      status: "ACTIVE",
      createdOnUTC: new Date().toISOString(),
      updatedOnUTC: new Date().toISOString(),
    });
  };

  const upload = async (incidentId, images) => {
    const storage = Firebase.default.storage();

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      const fileURL = `/files/incidents/${incidentId}/${element.name}`;
      const refToFile = storage.ref(fileURL);

      const uploadTask = refToFile.put(element);
      await handleIncidentDocumentsLink(incidentId, fileURL);

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

  const handleCompleteRegistration = async (incidentId, incidentData) => {
    const db = Firebase.default.firestore();

    await db.collection("Incidents").doc(incidentId).update({
      title: incidentData.title,
      description: incidentData.description,
      incidentType: incidentData.incidentType,
      updateBy: authUser.email,
      updatedById: authUser.uid,
    });
  };

  const handleContinueClicked = async (event, formValues) => {
    event.preventDefault();
    if (
      !validatorConfig.title.validate(formValues.title) ||
      !validatorConfig.description.validate(formValues.description)
    ) {
      toast.warning("Por favor complete el formulario.");
      return;
    }

    if (formValues.images.length === 0 && dataDocuments.length === 0) {
      toast.warning("No se ha seleccionado ningún archivo.");
      return;
    }

    if (formValues.images.length > 0) {
      await upload(incidentId, formValues.images);
    }
    await handleCompleteRegistration(incidentId, formValues);

    toast.success("Registro completado existosamente");
    router.push(paths.SECURITY.LIST());
  };

  const {
    data: dataIncident,
    status: statusIncident,
    error: errorIncident,
  } = useFirestoreQuery(db.collection("Incidents").doc(incidentId));

  const {
    data: dataDocuments,
    status: statusDocuments,
    error: errorDocuments,
  } = useFirestoreQuery(
    db
      .collection("Incident_Documents")
      .where("incidentId", "==", incidentId ?? "")
  );

  if (statusIncident === "loading" || statusDocuments === "loading") {
    return (
      <NewLayout>
        <div className="flex items-start h-screen">
          <div className="flex xs:w-1/6"></div>
          <div className="flex flex-col  xs:w-4/6  items-left  align-middle mt-10">
            Los datos se están cargando, espere por favor.
          </div>
          <div className="flex xs:w-1/6"></div>
        </div>
      </NewLayout>
    );
  }

  return (
    <NewLayout>
      <div className="flex items-start h-screen">
        <div className="flex xs:w-1/6"></div>
        <div className="flex flex-col  xs:w-4/6  items-left  align-middle mt-10">
          <IncidentEdit
            title={dataIncident.title}
            description={dataIncident.description}
            incidentType={dataIncident.incidentType}
            formValidatorConfig={validatorConfig}
            onContinueClicked={handleContinueClicked}
            incidentOptions={incidentOptions}
          ></IncidentEdit>
        </div>
        <div className="grid grid-flow-col w-full h-32 px-2">
          {dataDocuments.map((x, i) => (
            <Thumbnail key={i} imagePath={x.url}></Thumbnail>
          ))}
        </div>
        <div className="flex xs:w-1/6"></div>
      </div>
    </NewLayout>
  );
}

export default IncidentEditPage;
