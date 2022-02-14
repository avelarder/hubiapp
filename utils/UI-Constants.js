import moment from "moment";

export const VALIDATIONS = {
    NONE: (input) => input.length > 0,
    REQUIRED_FREE_TEXT: (input) => input.length > 0,
    ONLY_LETTERS: (input) => /^[a-zA-Z]+$/.test(input),
    ONLY_NUMBERS: (input) => /^[0-9]+$/.test(input),
    EMAIL: (input) =>
        // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            input
        ),
    ZIPCODE: (input) => /^[0-9]{5}$/.test(input),
    PHONE_NUMBER: (input) =>
        /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(input),
    DATE: (input) =>
        moment(input, "DD/MM/YYYY", true).isValid(),
    DATE_AFTER: (input) => {
        return moment(input, "DD/MM/YYYY", true).isValid() && moment(input, "DD/MM/YYYY", true).isAfter(moment())
    },
    DATETIME_AFTER: (input) => {
        return moment(input).isValid() && moment(input).isAfter(moment())
    },
};

export const INVALID_TEXTS = {
    NONE: undefined,
    ONLY_LETTERS: "Only alphabetic characters are allowed",
    ONLY_NUMBERS: "Only numbers are allowed",
    EMAIL: "Please enter a valid email",
    ZIPCODE: "Please enter a valid zipcode",
    PHONE_NUMBER: "Please enter a valid phone number",
    DATE: "Please enter a valid date",
};

export const MASKS = {
    NONE: undefined,
    ONLY_LETTERS: undefined,
    ONLY_NUMBERS: undefined,
    EMAIL: undefined,
    ZIPCODE: "99999",
    PHONE_NUMBER: "(999) 999-9999",
};

export const INPUT_TEXT_VALIDATIONS = ["NONE", "EMAIL"];
