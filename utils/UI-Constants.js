import moment from "moment";

export const postOptions = [
    { key: "news", steps: 3 },
    { key: "marketplace", steps: 4 },
    { key: "survey", steps: 4 },
    { key: "rent", steps: 4 },
    { key: "report", steps: 3 },
];

export const postScopeOptions = [
    { id: "PUBLIC", text: "Público" },
    { id: "A", text: "La Floresta" },
];

export const getMinutes = (minutes) => {
    if (minutes == 0) return 0;
    if (minutes <= 15) return 15;
    if (minutes <= 30) return 30;
    if (minutes <= 45) return 45;
    return 0
}

export const getScheduleMonths = () => [
    { id: 1, text: "Enero" },
    { id: 2, text: "Febrero" },
    { id: 3, text: "Marzo" },
    { id: 4, text: "Abril" },
    { id: 5, text: "Mayo" },
    { id: 6, text: "Junio" },
    { id: 7, text: "Julio" },
    { id: 8, text: "Agosto" },
    { id: 9, text: "Setiembre" },
    { id: 10, text: "Octubre" },
    { id: 11, text: "Noviembre" },
    { id: 12, text: "Diciembre" },
];


export const getScheduleYears = (start, end) => {
    const years = [];
    const initYear = start ?? (new Date()).getFullYear()
    const endYear = end ?? initYear + 20

    for (let i = initYear; i < endYear; i++) {
        years.push({ id: i, text: i });
    }
    return years;
}
export const getScheduleDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
        days.push({ id: i, text: i });
    }
    return days;
}
export const getScheduleHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push({ id: i, text: i });
    }
    return hours;
}
export const getScheduleMinutes = () => [
    { id: 0, text: "00" },
    { id: 15, text: "15" },
    { id: 30, text: "30" },
    { id: 45, text: "45" },
];

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
