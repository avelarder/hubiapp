import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../authUserProvider";
import Firebase from "../../../../firebase";
import { toast } from "react-toastify";
import NewLayout from "../../../../components/newLayout";

import { VALIDATIONS, incidentOptions } from "../../../../utils/UI-Constants";

import { paths } from "../../../../utils/paths";

import IncidentReview from "../../../../components/incidents/review";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";
import Loader from "../../../../components/common/loader";

function IncidentReviewPage() {
  const router = useRouter();
  const { query } = router;
  const incidentId = query.incidenciaId;

  const { authUser } = useAuth();
  const [comments, setComments] = useState([]);

  const validatorConfig = {
    actions: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Acciones preventivas son requeridas.",
    },
    comments: {
      validate: (content) => {
        return VALIDATIONS.REQUIRED_FREE_TEXT(content);
      },
      message: "Para devolver un incidente se precisan comentarios.",
    },
  };

  const handleContinueClicked = async (event, formValues) => {
    event.preventDefault();

    if (!validatorConfig.actions.validate(formValues.actions)) {
      toast.warning("Por favor complete el formulario.");
      return;
    }
    const db = Firebase.default.firestore();

    await db.collection("Incidents").doc(incidentId).update({
      status: "REVIEWED",
      actions: formValues.actions,
      reviewedBy: authUser.email,
      reviewedById: authUser.uid,
      reviewedOnUTC: new Date().toISOString(),
      updatedOnUTC: new Date().toISOString(),
    });

    toast.success("Registro completado existosamente");
    router.push(paths.SECURITY.LIST());
  };

  const handleReturnClicked = async (commentObj) => {
    if (!validatorConfig.comments.validate(commentObj.comment)) {
      toast.warning("No se registraron comentarios.");
      return;
    }
    const db = Firebase.default.firestore();

    await db
      .collection("Incidents")
      .doc(incidentId)
      .update({
        status: "RETURNED",
        comments: [...comments, commentObj],
        returnedBy: authUser.email,
        returnedById: authUser.uid,
        returnedOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });

    toast.success("Registro completado existosamente");
    router.push(paths.SECURITY.LIST());
  };

  const db = Firebase.default.firestore();

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

  useEffect(() => {
    if (dataIncident) {
      setComments(dataIncident.comments ?? []);
    }
  }, [dataIncident, setComments]);

  if (statusIncident === "loading" || statusDocuments === "loading") {
    return <Loader></Loader>;
  }
  return (
    <NewLayout>
      <div className="flex items-start h-screen">
        <div className="flex xs:w-1/6"></div>
        <div className="flex flex-col  xs:w-4/6  items-left  align-middle mt-10">
          <IncidentReview
            incident={dataIncident}
            documents={dataDocuments}
            title="Registro Incidencia"
            formValidatorConfig={validatorConfig}
            onContinueClicked={handleContinueClicked}
            onReturnClicked={handleReturnClicked}
            incidentOptions={incidentOptions}
          ></IncidentReview>
        </div>
        <div className="flex xs:w-1/6"></div>
      </div>
    </NewLayout>
  );
}

export default IncidentReviewPage;
