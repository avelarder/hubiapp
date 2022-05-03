import moment from "moment";


export const genderOptions = [
    { id: "MALE", text: "Masculino" },
    { id: "FEMALE", text: "Femenino" },
    { id: "OTHER", text: "Otro" },
];
export const statusOptions = [
    { id: "SINGLE", text: "Soltero(a)" },
    { id: "MARRIED", text: "Casado(a)" },
    { id: "DIVORCED", text: "Divorciado(a)" },
    { id: "WIDOW", text: "Viudo(a)" },
    { id: "OTHER", text: "Otro" },
];
export const accessTypeOptions = [
    { id: "ADMINISTRATOR", text: "Administrador" },
    { id: "CONCIERGE", text: "Conserje" },
    { id: "CLEANNING", text: "Limpieza" },
    { id: "OWNER", text: "Propietario" },
    { id: "TENAT", text: "Inquilino" },
    { id: "GUEST", text: "Familiar" },
];
export const employeeTypeOptions = [
    { id: "ADMINISTRATOR", text: "Administrador" },
    { id: "CONCIERGE", text: "Conserje" },
    { id: "CLEANNING", text: "Limpieza" },
];
export const documentTypeOptions = [
    { id: "DNI", text: "DNI" },
    { id: "PASSPORT", text: "Pasaporte" },
    { id: "OTHER", text: "Otro" },
];
export const phoneAreaOptions = [
    { id: "AF/AFG", text: "Afghanistan (+93)" },
    { id: "AL/ALB", text: "Albania (+355)" },
    { id: "DZ/DZA", text: "Algeria (+213)" },
    { id: "AS/ASM", text: "American Samoa (+1-684)" },
    { id: "AD/AND", text: "Andorra (+376)" },
    { id: "AO/AGO", text: "Angola (+244)" },
    { id: "AI/AIA", text: "Anguilla (+1-264)" },
    { id: "AQ/ATA", text: "Antarctica (+672)" },
    { id: "AG/ATG", text: "Antigua and Barbuda (+1-268)" },
    { id: "AR/ARG", text: "Argentina (+54)" },
    { id: "AM/ARM", text: "Armenia (+374)" },
    { id: "AW/ABW", text: "Aruba (+297)" },
    { id: "AU/AUS", text: "Australia (+61)" },
    { id: "AT/AUT", text: "Austria (+43)" },
    { id: "AZ/AZE", text: "Azerbaijan (+994)" },
    { id: "BS/BHS", text: "Bahamas (+1-242)" },
    { id: "BH/BHR", text: "Bahrain (+973)" },
    { id: "BD/BGD", text: "Bangladesh (+880)" },
    { id: "BB/BRB", text: "Barbados (+1-246)" },
    { id: "BY/BLR", text: "Belarus (+375)" },
    { id: "BE/BEL", text: "Belgium (+32)" },
    { id: "BZ/BLZ", text: "Belize (+501)" },
    { id: "BJ/BEN", text: "Benin (+229)" },
    { id: "BM/BMU", text: "Bermuda (+1-441)" },
    { id: "BT/BTN", text: "Bhutan (+975)" },
    { id: "BO/BOL", text: "Bolivia (+591)" },
    { id: "BA/BIH", text: "Bosnia and Herzegovina (+387)" },
    { id: "BW/BWA", text: "Botswana (+267)" },
    { id: "BR/BRA", text: "Brazil (+55)" },
    { id: "IO/IOT", text: "British Indian Ocean Territory (+246)" },
    { id: "VG/VGB", text: "British Virgin Islands (+1-284)" },
    { id: "BN/BRN", text: "Brunei (+673)" },
    { id: "BG/BGR", text: "Bulgaria (+359)" },
    { id: "BF/BFA", text: "Burkina Faso (+226)" },
    { id: "BI/BDI", text: "Burundi (+257)" },
    { id: "KH/KHM", text: "Cambodia (+855)" },
    { id: "CM/CMR", text: "Cameroon (+237)" },
    { id: "CA/CAN", text: "Canada (+1)" },
    { id: "CV/CPV", text: "Cape Verde (+238)" },
    { id: "KY/CYM", text: "Cayman Islands (+1-345)" },
    { id: "CF/CAF", text: "Central African Republic (+236)" },
    { id: "TD/TCD", text: "Chad (+235)" },
    { id: "CL/CHL", text: "Chile (+56)" },
    { id: "CN/CHN", text: "China (+86)" },
    { id: "CX/CXR", text: "Christmas Island (+61)" },
    { id: "CC/CCK", text: "Cocos Islands (+61)" },
    { id: "CO/COL", text: "Colombia (+57)" },
    { id: "KM/COM", text: "Comoros (+269)" },
    { id: "CK/COK", text: "Cook Islands (+682)" },
    { id: "CR/CRI", text: "Costa Rica (+506)" },
    { id: "HR/HRV", text: "Croatia (+385)" },
    { id: "CU/CUB", text: "Cuba (+53)" },
    { id: "CW/CUW", text: "Curacao (+599)" },
    { id: "CY/CYP", text: "Cyprus (+357)" },
    { id: "CZ/CZE", text: "Czech Republic (+420)" },
    { id: "CD/COD", text: "Democratic Republic of the Congo (+243)" },
    { id: "DK/DNK", text: "Denmark (+45)" },
    { id: "DJ/DJI", text: "Djibouti (+253)" },
    { id: "DM/DMA", text: "Dominica (+1-767)" },
    { id: "DO/DOM", text: "Dominican Republic (+1-809, 1-829, 1-849)" },
    { id: "TL/TLS", text: "East Timor (+670)" },
    { id: "EC/ECU", text: "Ecuador (+593)" },
    { id: "EG/EGY", text: "Egypt (+20)" },
    { id: "SV/SLV", text: "El Salvador (+503)" },
    { id: "GQ/GNQ", text: "Equatorial Guinea (+240)" },
    { id: "ER/ERI", text: "Eritrea (+291)" },
    { id: "EE/EST", text: "Estonia (+372)" },
    { id: "ET/ETH", text: "Ethiopia (+251)" },
    { id: "FK/FLK", text: "Falkland Islands (+500)" },
    { id: "FO/FRO", text: "Faroe Islands (+298)" },
    { id: "FJ/FJI", text: "Fiji (+679)" },
    { id: "FI/FIN", text: "Finland (+358)" },
    { id: "FR/FRA", text: "France (+33)" },
    { id: "PF/PYF", text: "French Polynesia (+689)" },
    { id: "GA/GAB", text: "Gabon (+241)" },
    { id: "GM/GMB", text: "Gambia (+220)" },
    { id: "GE/GEO", text: "Georgia (+995)" },
    { id: "DE/DEU", text: "Germany (+49)" },
    { id: "GH/GHA", text: "Ghana (+233)" },
    { id: "GI/GIB", text: "Gibraltar (+350)" },
    { id: "GR/GRC", text: "Greece (+30)" },
    { id: "GL/GRL", text: "Greenland (+299)" },
    { id: "GD/GRD", text: "Grenada (+1-473)" },
    { id: "GU/GUM", text: "Guam (+1-671)" },
    { id: "GT/GTM", text: "Guatemala (+502)" },
    { id: "GG/GGY", text: "Guernsey (+44-1481)" },
    { id: "GN/GIN", text: "Guinea (+224)" },
    { id: "GW/GNB", text: "Guinea-Bissau (+245)" },
    { id: "GY/GUY", text: "Guyana (+592)" },
    { id: "HT/HTI", text: "Haiti (+509)" },
    { id: "HN/HND", text: "Honduras (+504)" },
    { id: "HK/HKG", text: "Hong Kong (+852)" },
    { id: "HU/HUN", text: "Hungary (+36)" },
    { id: "IS/ISL", text: "Iceland (+354)" },
    { id: "IN/IND", text: "India (+91)" },
    { id: "ID/IDN", text: "Indonesia (+62)" },
    { id: "IR/IRN", text: "Iran (+98)" },
    { id: "IQ/IRQ", text: "Iraq (+964)" },
    { id: "IE/IRL", text: "Ireland (+353)" },
    { id: "IM/IMN", text: "Isle of Man (+44-1624)" },
    { id: "IL/ISR", text: "Israel (+972)" },
    { id: "IT/ITA", text: "Italy (+39)" },
    { id: "CI/CIV", text: "Ivory Coast (+225)" },
    { id: "JM/JAM", text: "Jamaica (+1-876)" },
    { id: "JP/JPN", text: "Japan (+81)" },
    { id: "JE/JEY", text: "Jersey (+44-1534)" },
    { id: "JO/JOR", text: "Jordan (+962)" },
    { id: "KZ/KAZ", text: "Kazakhstan (+7)" },
    { id: "KE/KEN", text: "Kenya (+254)" },
    { id: "KI/KIR", text: "Kiribati (+686)" },
    { id: "XK/XKX", text: "Kosovo (+383)" },
    { id: "KW/KWT", text: "Kuwait (+965)" },
    { id: "KG/KGZ", text: "Kyrgyzstan (+996)" },
    { id: "LA/LAO", text: "Laos (+856)" },
    { id: "LV/LVA", text: "Latvia (+371)" },
    { id: "LB/LBN", text: "Lebanon (+961)" },
    { id: "LS/LSO", text: "Lesotho (+266)" },
    { id: "LR/LBR", text: "Liberia (+231)" },
    { id: "LY/LBY", text: "Libya (+218)" },
    { id: "LI/LIE", text: "Liechtenstein (+423)" },
    { id: "LT/LTU", text: "Lithuania (+370)" },
    { id: "LU/LUX", text: "Luxembourg (+352)" },
    { id: "MO/MAC", text: "Macau (+853)" },
    { id: "MK/MKD", text: "Macedonia (+389)" },
    { id: "MG/MDG", text: "Madagascar (+261)" },
    { id: "MW/MWI", text: "Malawi (+265)" },
    { id: "MY/MYS", text: "Malaysia (+60)" },
    { id: "MV/MDV", text: "Maldives (+960)" },
    { id: "ML/MLI", text: "Mali (+223)" },
    { id: "MT/MLT", text: "Malta (+356)" },
    { id: "MH/MHL", text: "Marshall Islands (+692)" },
    { id: "MR/MRT", text: "Mauritania (+222)" },
    { id: "MU/MUS", text: "Mauritius (+230)" },
    { id: "YT/MYT", text: "Mayotte (+262)" },
    { id: "MX/MEX", text: "Mexico (+52)" },
    { id: "FM/FSM", text: "Micronesia (+691)" },
    { id: "MD/MDA", text: "Moldova (+373)" },
    { id: "MC/MCO", text: "Monaco (+377)" },
    { id: "MN/MNG", text: "Mongolia (+976)" },
    { id: "ME/MNE", text: "Montenegro (+382)" },
    { id: "MS/MSR", text: "Montserrat (+1-664)" },
    { id: "MA/MAR", text: "Morocco (+212)" },
    { id: "MZ/MOZ", text: "Mozambique (+258)" },
    { id: "MM/MMR", text: "Myanmar (+95)" },
    { id: "NA/NAM", text: "Namibia (+264)" },
    { id: "NR/NRU", text: "Nauru (+674)" },
    { id: "NP/NPL", text: "Nepal (+977)" },
    { id: "NL/NLD", text: "Netherlands (+31)" },
    { id: "AN/ANT", text: "Netherlands Antilles (+599)" },
    { id: "NC/NCL", text: "New Caledonia (+687)" },
    { id: "NZ/NZL", text: "New Zealand (+64)" },
    { id: "NI/NIC", text: "Nicaragua (+505)" },
    { id: "NE/NER", text: "Niger (+227)" },
    { id: "NG/NGA", text: "Nigeria (+234)" },
    { id: "NU/NIU", text: "Niue (+683)" },
    { id: "KP/PRK", text: "North Korea (+850)" },
    { id: "MP/MNP", text: "Northern Mariana Islands (+1-670)" },
    { id: "NO/NOR", text: "Norway (+47)" },
    { id: "OM/OMN", text: "Oman (+968)" },
    { id: "PK/PAK", text: "Pakistan (+92)" },
    { id: "PW/PLW", text: "Palau (+680)" },
    { id: "PS/PSE", text: "Palestine (+970)" },
    { id: "PA/PAN", text: "Panama (+507)" },
    { id: "PG/PNG", text: "Papua New Guinea (+675)" },
    { id: "PY/PRY", text: "Paraguay (+595)" },
    { id: "PE/PER", text: "Peru (+51)" },
    { id: "PH/PHL", text: "Philippines (+63)" },
    { id: "PN/PCN", text: "Pitcairn (+64)" },
    { id: "PL/POL", text: "Poland (+48)" },
    { id: "PT/PRT", text: "Portugal (+351)" },
    { id: "PR/PRI", text: "Puerto Rico (+1-787, 1-939)" },
    { id: "QA/QAT", text: "Qatar (+974)" },
    { id: "CG/COG", text: "Republic of the Congo (+242)" },
    { id: "RE/REU", text: "Reunion (+262)" },
    { id: "RO/ROU", text: "Romania (+40)" },
    { id: "RU/RUS", text: "Russia (+7)" },
    { id: "RW/RWA", text: "Rwanda (+250)" },
    { id: "BL/BLM", text: "Saint Barthelemy (+590)" },
    { id: "SH/SHN", text: "Saint Helena (+290)" },
    { id: "KN/KNA", text: "Saint Kitts and Nevis (+1-869)" },
    { id: "LC/LCA", text: "Saint Lucia (+1-758)" },
    { id: "MF/MAF", text: "Saint Martin (+590)" },
    { id: "PM/SPM", text: "Saint Pierre and Miquelon (+508)" },
    { id: "VC/VCT", text: "Saint Vincent and the Grenadines (+1-784)" },
    { id: "WS/WSM", text: "Samoa (+685)" },
    { id: "SM/SMR", text: "San Marino (+378)" },
    { id: "ST/STP", text: "Sao Tome and Principe (+239)" },
    { id: "SA/SAU", text: "Saudi Arabia (+966)" },
    { id: "SN/SEN", text: "Senegal (+221)" },
    { id: "RS/SRB", text: "Serbia (+381)" },
    { id: "SC/SYC", text: "Seychelles (+248)" },
    { id: "SL/SLE", text: "Sierra Leone (+232)" },
    { id: "SG/SGP", text: "Singapore (+65)" },
    { id: "SX/SXM", text: "Sint Maarten (+1-721)" },
    { id: "SK/SVK", text: "Slovakia (+421)" },
    { id: "SI/SVN", text: "Slovenia (+386)" },
    { id: "SB/SLB", text: "Solomon Islands (+677)" },
    { id: "SO/SOM", text: "Somalia (+252)" },
    { id: "ZA/ZAF", text: "South Africa (+27)" },
    { id: "KR/KOR", text: "South Korea (+82)" },
    { id: "SS/SSD", text: "South Sudan (+211)" },
    { id: "ES/ESP", text: "Spain (+34)" },
    { id: "LK/LKA", text: "Sri Lanka (+94)" },
    { id: "SD/SDN", text: "Sudan (+249)" },
    { id: "SR/SUR", text: "Suriname (+597)" },
    { id: "SJ/SJM", text: "Svalbard and Jan Mayen (+47)" },
    { id: "SZ/SWZ", text: "Swaziland (+268)" },
    { id: "SE/SWE", text: "Sweden (+46)" },
    { id: "CH/CHE", text: "Switzerland (+41)" },
    { id: "SY/SYR", text: "Syria (+963)" },
    { id: "TW/TWN", text: "Taiwan (+886)" },
    { id: "TJ/TJK", text: "Tajikistan (+992)" },
    { id: "TZ/TZA", text: "Tanzania (+255)" },
    { id: "TH/THA", text: "Thailand (+66)" },
    { id: "TG/TGO", text: "Togo (+228)" },
    { id: "TK/TKL", text: "Tokelau (+690)" },
    { id: "TO/TON", text: "Tonga (+676)" },
    { id: "TT/TTO", text: "Trinidad and Tobago (+1-868)" },
    { id: "TN/TUN", text: "Tunisia (+216)" },
    { id: "TR/TUR", text: "Turkey (+90)" },
    { id: "TM/TKM", text: "Turkmenistan (+993)" },
    { id: "TC/TCA", text: "Turks and Caicos Islands (+1-649)" },
    { id: "TV/TUV", text: "Tuvalu (+688)" },
    { id: "VI/VIR", text: "U.S. Virgin Islands (+1-340)" },
    { id: "UG/UGA", text: "Uganda (+256)" },
    { id: "UA/UKR", text: "Ukraine (+380)" },
    { id: "AE/ARE", text: "United Arab Emirates (+971)" },
    { id: "GB/GBR", text: "United Kingdom (+44)" },
    { id: "US/USA", text: "United States (+1)" },
    { id: "UY/URY", text: "Uruguay (+598)" },
    { id: "UZ/UZB", text: "Uzbekistan (+998)" },
    { id: "VU/VUT", text: "Vanuatu (+678)" },
    { id: "VA/VAT", text: "Vatican (+379)" },
    { id: "VE/VEN", text: "Venezuela (+58)" },
    { id: "VN/VNM", text: "Vietnam (+84)" },
    { id: "WF/WLF", text: "Wallis and Futuna (+681)" },
    { id: "EH/ESH", text: "Western Sahara (+212)" },
    { id: "YE/YEM", text: "Yemen (+967)" },
    { id: "ZM/ZMB", text: "Zambia (+260)" },
    { id: "ZW/ZWE", text: "Zimbabwe (+263)" },
];

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
    PASSWORD: (input) => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return strongRegex.test(input)
    },
    REQUIRED_FREE_TEXT: (input) => input.length > 0,
    ONLY_LETTERS: (input) => /^[a-zA-Z]+$/.test(input),
    ONLY_NUMBERS: (input) => /^[0-9]+$/.test(input),
    EMAIL: (input) =>
        // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            input
        ),
    ZIPCODE: (input) => /^[0-9]{5}$/.test(input),
    ACTIVATION_CODE: (input) => /^[0-9]{7}$/.test(input),
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
