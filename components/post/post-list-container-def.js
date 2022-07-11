export const tableStructure = {
  headers: [
    {
      source: "description",
      columnName: "Descripción",
      isLink: true,
      path: (id) => `publicaciones/${id}/detalle`,
    },
    {
      source: "createdOnUTC",
      columnName: "Registrado",
      isDate: true,
      format: "DD/MM/YYYY",
    },
    {
      source: "surveyExpiration",
      columnName: "Expiración",
      isDate: true,
      format: "DD/MM/YYYY",
    },
  ],
  data: [],
};

export const DEFAULT_SECTION_TITLE = "Avisos";

export const DEFAULT_SORTING_COLUMN = "createdOnUTC";
export const DEFAULT_LIMIT = 10;
export const DEFAULT_QUERY = (dbInstance, orderField, rowsPerPage) =>
  dbInstance
    .collection("Publications")
    .orderBy(orderField, "desc")
    .limit(rowsPerPage);

export const DEFAULT_MAP_RESOLVER = (doc) => {
  return {
    id: doc.id,
    description: doc.description,
    createdOnUTC: doc.createdOnUTC,
    surveyExpiration: doc.surveyExpiration ?? "--",
  };
};

export const handleViewClicked = (router, id) => {
  router.push(`/app/publicaciones/${id}/detalle`);
};

export const handleRowClicked = (router, id) => {
  router.push(`/app/publicaciones/${id}/detalle`);
};

export const handleDeleteConfirmation = async (dbInstance, postToDelete) => {
  await dbInstance.collection("Publications").doc(postToDelete).delete();
};
