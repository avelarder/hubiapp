export const tableStructure = {
  headers: [
    {
      source: "title",
      columnName: "Título",
      isLink: true,
      path: (id) => `events/${id}/detalle`,
    },
    {
      source: "startDate",
      columnName: "Fecha de Inicio",
      isDate: true,
      format: "DD/MM/YYYY",
    },
    {
      source: "startTime",
      columnName: "Hora de Inicio",
      isDate: true,
      format: "DD/MM/YYYY",
    },
    {
      source: "endDate",
      columnName: "Fecha de Fin",
      isDate: true,
      format: "DD/MM/YYYY",
    },
    {
      source: "endTime",
      columnName: "Hora de Fin",
      isDate: true,
      format: "DD/MM/YYYY",
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

export const DEFAULT_SECTION_TITLE = "Eventos";

export const DEFAULT_SORTING_COLUMN = "createdOnUTC";
export const DEFAULT_LIMIT = 10;
export const DEFAULT_QUERY = (dbInstance, orderField, rowsPerPage) =>
  dbInstance
    .collection("Events")
    .orderBy(orderField, "desc")
    .limit(rowsPerPage);

export const DEFAULT_MAP_RESOLVER = (doc) => {
  return {
    id: doc.id,
    title: doc.title,
    startDate: doc.startDate,
    startTime: doc.startTime,
    endDate: doc.endDate,
    endTime: doc.endTime,
    createdOnUTC: doc.createdOnUTC,
  };
};

export const handleViewClicked = (router, id) => {
  router.push(`/app/eventos/${id}/detalle`);
};

export const handleRowClicked = (router, id) => {
  router.push(`/app/eventos/${id}/detalle`);
};

export const handleDeleteConfirmation = async (dbInstance, postToDelete) => {
  await dbInstance.collection("Events").doc(postToDelete).delete();
};
