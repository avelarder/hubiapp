import { VALIDATIONS } from "../../utils/UI-Constants";

const createResidentValidatorConfig = {
  numberOfResidents: {
    validate: (content) => {
      return VALIDATIONS.ONLY_NUMBERS_GREATHER_THAN_ZERO(content);
    },
    message: "Especifique un número de residentes válido.",
  },

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

  email: {
    validate: (content) => {
      return VALIDATIONS.EMAIL(content);
    },
    message: "Ingrese su correo electrónico.",
  },

  address: {
    validate: (content) => {
      return VALIDATIONS.REQUIRED_FREE_TEXT(content);
    },
    message: "Ingrese su domicilio de residencia.",
  },

  appartmentNumber: {
    validate: (content) => {
      return VALIDATIONS.ONLY_NUMBERS(content);
    },
    message: "Ingrese su número de apartamento.",
  },

  documentId: {
    validate: (content) => {
      return VALIDATIONS.ONLY_NUMBERS(content);
    },
    message: "Reingrese su documento de identidad.",
  },
};

const editResidentValidatorConfig = {
  numberOfResidents: {
    validate: (content) => {
      return VALIDATIONS.ONLY_NUMBERS_GREATHER_THAN_ZERO(content);
    },
    message: "Especifique un número de residentes válido.",
  },

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

  email: {
    validate: (content) => {
      return VALIDATIONS.EMAIL(content);
    },
    message: "Ingrese su correo electrónico.",
  },

  address: {
    validate: (content) => {
      return VALIDATIONS.REQUIRED_FREE_TEXT(content);
    },
    message: "Ingrese su domicilio de residencia.",
  },

  appartmentNumber: {
    validate: (content) => {
      return VALIDATIONS.ONLY_NUMBERS(content);
    },
    message: "Ingrese su número de apartamento.",
  },

  documentId: {
    validate: (content) => {
      return VALIDATIONS.ONLY_NUMBERS(content);
    },
    message: "Reingrese su documento de identidad.",
  },
};

export { createResidentValidatorConfig, editResidentValidatorConfig };
