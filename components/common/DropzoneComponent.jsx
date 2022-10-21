import React, { useCallback } from "react";
import { useMemo } from "react";
import Firebase from "../../firebase";

import { useDropzone } from "react-dropzone";
import { uuid as v4 } from "uuidv4";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DropzoneComponent({ location }) {
  const onDrop = useCallback((acceptedFiles) => {
    upload(location.id, acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
  });

  const handleDocument = async (
    locationId,
    documentId,
    name,
    type,
    size,
    url
  ) => {
    const db = Firebase.default.firestore();

    await db
      .collection("Documents")
      .doc(documentId)
      .set({
        url: `${url}`,
        name: name,
        type: type,
        status: "CREATED",
        size: size,
        location: locationId,
        featuredBy: [],
        tags: [],
        createdOnUTC: new Date().toISOString(),
        updatedOnUTC: new Date().toISOString(),
      });
  };

  const upload = async (locationId, acceptedFiles) => {
    const storage = Firebase.default.storage();

    for (let index = 0; index < acceptedFiles.length; index++) {
      const documentId = v4();
      const element = acceptedFiles[index];
      const fileURL = `/files/documentos/${locationId}/${documentId}/${element.name}`;
      const refToFile = storage.ref(fileURL);

      const uploadTask = refToFile.put(element);

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
          await handleDocument(
            locationId,
            documentId,
            element.name,
            element.type,
            element.size,
            fileURL
          );
        }
      );
    }
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>Arrastre archivos aquí o haga click para seleccionar.</div>
      </div>
    </div>
  );
}

export default DropzoneComponent;
