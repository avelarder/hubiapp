export const tableStructure = {
  headers: [
    {
      source: "title",
      columnName: "Título",
      isLink: true,
      path: (id) => `marketplace/${id}/detalle`,
    },
    {
      source: "operationTypeOption",
      columnName: "Operación",
      isDate: false,
    },

    {
      source: "operationStatusOption",
      columnName: "Estado",
      isDate: false,
    },

    {
      source: "createdOnUTC",
      columnName: "Registrado",
      isDate: true,
      format: "DD/MM/YYYY",
    },
  ],
  data: [],
};

export const DEFAULT_SECTION_TITLE = "Marketplace";

export const DEFAULT_SORTING_COLUMN = "createdOnUTC";
export const DEFAULT_LIMIT = 10;
export const DEFAULT_QUERY = (dbInstance, orderField, rowsPerPage) =>
  dbInstance
    .collection("Marketplace")
    .orderBy(orderField, "desc")
    .limit(rowsPerPage);

export const DEFAULT_MAP_RESOLVER = (doc) => {
  return {
    id: doc.id,
    title: doc.title,
    operationTypeOption: doc.operationTypeOption.text,
    operationStatusOption: doc.operationStatusOption.text,
    createdOnUTC: doc.createdOnUTC,
  };
};

export const handleViewClicked = (router, id) => {
  router.push(`/app/marketplace/${id}/detalle`);
};

export const handleRowClicked = (router, id) => {
  router.push(`/app/marketplace/${id}/detalle`);
};

export const handleDeleteConfirmation = async (dbInstance, postToDelete) => {
  await dbInstance.collection("Marketplace").doc(postToDelete).delete();
};
