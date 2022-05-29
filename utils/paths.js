export const paths = {
  ADMIN: {
    DASHBOARD: () => "/admin/dashboard",
    LOCATION_PICKER: () => "/admin/actions/pick-location",
    REGISTER_COLLABORATOR: (locationId) => `/admin/actions/${locationId}/register-collaborator`,
  },
  DASHBOARD: () => "/app/dashboard",
  USER_CREATION: {
    COLLABORATORS: () => "/usuarios/colaboradores/crear",
    RESIDENTS: () => "/usuarios/residentes/crear",
  },
  REGISTER: {
    PROFILE_COLLABORATOR: (locationId) =>
      `/usuarios/${locationId}/registro-colaborador`,
    PROFILE_RESIDENT: (locationId) =>
      `/usuarios/${locationId}/registro-resident`,
    LOCATION: () => "/usuarios/locacion",
  },
  WELCOME: () => "/usuarios/bienvenido",
  COLLABORATORS: {
    LIST: () => "/collaboradores",
    CREATE: () => "/collaboradores/crear",
    EDIT: (collaboratorId) => `/collaboradores/${collaboratorId}/editar`,
    DETAILS: (collaboratorId) => `/collaboradores/${collaboratorId}/detalle`,
  },
  ERROR: {
    NO_ACTIVATION_RECORD: () => "/usuarios/sin-activacion",
    NO_PROFILE_FOUND: () => "/usuarios/sin-perfil",
  },
};
