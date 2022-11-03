export const paths = {
  ADMIN: {
    SIGN_IN: () => "/admin/signin",
    DASHBOARD: () => "/admin/dashboard",
    LOCATION_PICKER: () => "/admin/actions/pick-location",
    REGISTER_COLLABORATOR: (locationId) =>
      `/admin/actions/${locationId}/registro-colaborador`,
  },
  LOGIN: () => "/login",
  DASHBOARD: () => "/app/dashboard",

  REGISTER: {
    EMAIL_VERIFICATION: (userId, userEmail, activationHash) =>
      `/usuarios/envio?uuid=${userId}&hash=${activationHash}&email=${userEmail}`,
    PASSWORD_RESET: () => "/usuarios/envio",
  },
  WELCOME: () => "/usuarios/bienvenido",
  COLLABORATORS: {
    LIST: () => "/collaboradores",
    CREATE: () => "/collaboradores/crear",
    EDIT: (collaboratorId) => `/collaboradores/${collaboratorId}/editar`,
    DETAILS: (collaboratorId) => `/collaboradores/${collaboratorId}/detalle`,
  },
  SECURITY: {
    LIST: () => "/app/seguridad",
    CREATE: () => "/seguridad/crear",
    EDIT: (incidentId) => `/seguridad/${incidentId}/editar`,
    DETAILS: (incidentId) => `/seguridad/${incidentId}/detalle`,
  },
  ERROR: {
    NO_REGISTRATION: () => "/usuarios/sin-registro",
    NO_LOCATION: () => "/usuarios/sin-locacion",
    NO_PASSWORD_RESET: () => "/usuarios/sin-restablecer",
    NO_ACTIVATION_RECORD: () => "/usuarios/sin-activacion",
    NO_PROFILE_FOUND: () => "/usuarios/sin-perfil",
  },
};
