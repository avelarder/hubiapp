export const paths = {
    DASHBOARD: () => "/app/dashboard",
    USER_CREATION: {
        COLLABORATORS: () => "/usuarios/colaboradores/crear",
        RESIDENTS: () => "/usuarios/residentes/crear",
    },
    REGISTER: {
        PROFILE: (locationId) => `/usuarios/${locationId}/registro`,
        LOCATION: () => "/usuarios/locacion",
    },
    WELCOME: () => "/usuarios/bienvenido",
    ERROR: {
        NO_ACTIVATION_RECORD: () => "/usuarios/sin-activacion",
        NO_PROFILE_FOUND: () => "/usuarios/sin-perfil",
    }
}
